"use strict";
/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQS = void 0;
const AWS = require("aws-sdk");
const message_broker_types_1 = require("../message-broker.types");
const sqs_context_1 = require("./context/sqs.context");
/**
 * Subscriber of AWS SQS
 * It supports Amazon SQS short and long polling
 *
 * Usage:
 * ````typescript
 * const app = await NestFactory.createMicroservice<MicroserviceOptions>(
 *   AppModule,
 *   MessageBrokerFactory.subscriber({
 *    'subscriber': MessageBroker.SQS //‘SQS/Firebase/RabbitMQ/Redis’,
 *    'config': {config},
 *    'options': {}
 *   }),
 * )
 * ````
 */
class SQS extends message_broker_types_1.Subscriber {
    /**
     * Initialize AWS.SQS instance
     * @param config - Required AWS SQS configuration
     * @param options - Additional parameters to SQS service
     */
    constructor(config, options) {
        super();
        this.config = config;
        this.options = options;
        //private readonly MaxNumberOfMessages: number;
        this.terminate = false;
        this.initializeSerializer(null);
        this.initializeDeserializer(null);
        this.QueueUrl = config.endpoint;
        //this.MaxNumberOfMessages = options.MaxNumberOfMessages
        this.WaitTimeSeconds = options.WaitTimeSeconds || 0;
        delete config.endpoint;
        this.sqs = new AWS.SQS({
            ...config,
            apiVersion: '2012-11-05',
        });
    }
    /**
     * Start polling messages from AWS SQS queue
     */
    async listen() {
        while (!this.terminate) {
            await this.getMessage();
        }
    }
    /**
     * On close signal, turn off listener
     */
    close() {
        this.terminate = true;
    }
    /**
     * Request AWS SQS queue for a message
     */
    async getMessage() {
        try {
            const result = await this.receiveMessage();
            const packet = this.normalizeMessage(result);
            if (typeof packet === 'undefined') {
                return;
            }
            const context = new sqs_context_1.SQSContext([message_broker_types_1.MessageBroker.SQS, packet, result.Messages[0], this.sqs, this.ack]);
            return this.handleEvent(packet.pattern, packet, context);
        }
        catch (e) {
            this.handleError(`Job execution failed due to following error: ${e.message}`);
        }
    }
    /**
     * Call SQS queue for message
     */
    async receiveMessage() {
        const params = {
            MaxNumberOfMessages: 1,
            QueueUrl: this.QueueUrl,
            WaitTimeSeconds: this.WaitTimeSeconds,
        };
        return await this.sqs.receiveMessage(params).promise();
    }
    /**
     * Delete message once proccessed successfuly
     * @param ReceiptHandle - Message ReceiptHandle
     */
    async deleteMessage(ReceiptHandle) {
        const params = {
            QueueUrl: this.QueueUrl,
            ReceiptHandle,
        };
        return await this.sqs.deleteMessage(params).promise();
    }
    /**
     * Requeue message if processing failed
     * @param ReceiptHandle - Message ReceiptHandle
     */
    async requeueMessage(ReceiptHandle) {
        const params = {
            QueueUrl: this.QueueUrl,
            ReceiptHandle,
            VisibilityTimeout: 30,
        };
        return await this.sqs.changeMessageVisibility(params).promise();
    }
    /**
     * Normalize message body
     * @param result - Received response from AWS SQS queue
     */
    normalizeMessage(result) {
        //Check for the empty message body
        if (!result || !result.Messages || !result.Messages.length) {
            return;
        }
        const { Body } = result.Messages[0];
        const packet = this.deserializer.deserialize(JSON.parse(Body));
        packet.pattern = packet.pattern.toString();
        return packet;
    }
    /**
     * Acknowledgement function for context to notify AWS SQS queue once processing done
     */
    get ack() {
        const self = this; //eslint-disable-line @typescript-eslint/no-this-alias
        return async (ReceiptHandle, err) => {
            if (typeof err === 'undefined') {
                return self.deleteMessage(ReceiptHandle);
            }
            return self.requeueMessage(ReceiptHandle);
        };
    }
}
exports.SQS = SQS;
