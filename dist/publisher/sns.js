"use strict";
/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SNS = void 0;
const tslib_1 = require("tslib");
const AWS = require("aws-sdk");
const common_1 = require("@nestjs/common");
const message_broker_types_1 = require("../message-broker.types");
let SNS = 
/**
 * Publish message over AWS SNS
 *
 * Usage:
 * ```typescript
 * imports: [
 *   MessageBrokerFactory.publisher([{
 *     'name': 'DEMO_PUBLISH',
 *     'publisher': MessageBroker.SNS,
 *     'config': {config},
 *   }]),
 *  ...
 * ],
 *
 * @Inject('DEMO_PUBLISH') private publisher: Publisher
 * ```
 */
class SNS extends message_broker_types_1.Publisher {
    /**
     * Initialize AWS.SNS instance
     * @param config - Required AWS SNS configuration
     * @param options - Additional parameters to SNS service
     */
    constructor(config, options) {
        super();
        this.config = config;
        this.options = options;
        this.initializeSerializer(null);
        this.initializeDeserializer(null);
        this.TopicArn = config.endpoint;
        delete config.endpoint;
        this.sns = new AWS.SNS({
            ...config,
            apiVersion: '2012-11-05',
        });
    }
    /**
     * AWS SQS does not required pre-connect before sending any message.
     */
    async connect() { } //eslint-disable-line @typescript-eslint/no-empty-function
    /**
     * Nothing to close.
     */
    close() { } //eslint-disable-line @typescript-eslint/no-empty-function
    /**
     * Handle response when message sent to AWS SQS and notify to the subscriber
     * @param packet - Response body from AWS SQS
     * @param callback - Notifier to subcriber
     */
    handleResponse(packet, callback) {
        const { err, response, isDisposed } = this.deserializer.deserialize(packet);
        if (isDisposed || err) {
            return callback({
                err,
                response,
                isDisposed: true,
            });
        }
        callback({
            err,
            response,
        });
    }
    /**
     * Publish message
     * @param packet - Message to AWS SQS
     * @param callback - Notifier to subcriber
     * @returns Observable
     */
    publish(packet, callback) {
        try {
            this.sendMessage(packet)
                .then((response) => {
                this.handleResponse(response, callback);
            })
                .catch((err) => {
                this.handleResponse({ err }, callback);
            });
            return Function(); //eslint-disable-line @typescript-eslint/no-empty-function
        }
        catch (err) {
            callback({ err });
        }
    }
    /**
     * Publish message
     * @param packet - Message to AWS SQS
     * @returns Promise
     */
    async dispatchEvent(packet) {
        return this.sendMessage(packet);
    }
    /**
     * Send message to AWS SQS
     * @param packet - Message to AWS SQS
     * @returns Promise
     */
    sendMessage(packet) {
        // Inheritted from Publisher
        const pattern = this.normalizePattern(packet.pattern);
        const serializedPacket = this.serializer.serialize({
            pattern,
            ...packet,
        });
        const message = serializedPacket.data;
        const { options, data } = message;
        const params = {
            Message: JSON.stringify({ pattern, data }),
            TopicArn: this.TopicArn,
        };
        // message attributes
        if (options && typeof options === 'object') {
            const MessageAttributes = {};
            for (const [key, val] of Object.entries(options)) {
                MessageAttributes[key] = {
                    DataType: 'String',
                    StringValue: val,
                };
            }
            params.MessageAttributes = MessageAttributes;
        }
        console.log('@@@@@@@@@@', params);
        return this.sns.publish(params).promise();
    }
};
SNS = tslib_1.__decorate([
    common_1.Injectable()
    /**
     * Publish message over AWS SNS
     *
     * Usage:
     * ```typescript
     * imports: [
     *   MessageBrokerFactory.publisher([{
     *     'name': 'DEMO_PUBLISH',
     *     'publisher': MessageBroker.SNS,
     *     'config': {config},
     *   }]),
     *  ...
     * ],
     *
     * @Inject('DEMO_PUBLISH') private publisher: Publisher
     * ```
     */
    ,
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], SNS);
exports.SNS = SNS;
