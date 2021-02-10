/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
import { SNS, SQS } from 'aws-sdk';
import { ClientProxy, CustomTransportStrategy, ReadPacket, Server } from '@nestjs/microservices';
import { BaseRpcContext } from '@nestjs/microservices/ctx-host/base-rpc.context';
export declare enum MessageBroker {
    SQS = "SQS",
    SNS = "SNS",
    RabbitMQ = "RabbitMQ"
}
export interface SubscriberOptions {
    service: MessageBroker;
    config: SQSConfig;
    options: {
        [key: string]: any;
    };
}
export interface PublisherOptions {
    name: string;
    service: MessageBroker;
    config: SQSConfig | SNSConfig;
    options?: MessageBrokerOptions;
}
export declare type MessageBrokerOptions = {
    [key: string]: any;
};
export declare type PublishMessage = {
    options: {
        [key: string]: string;
    };
    data: string;
};
export declare type SubscriberContextArgs = [MessageBroker, ReadPacket<string>, unknown, SQS, Function];
export declare type SQSConfig = SQS.ClientConfiguration;
export declare type SNSConfig = SNS.ClientConfiguration;
export declare abstract class Subscriber extends Server implements CustomTransportStrategy {
    abstract listen(): Promise<void>;
    abstract close(): void;
}
export declare abstract class Publisher extends ClientProxy {
}
export declare abstract class SubscriberContext extends BaseRpcContext<SubscriberContextArgs> {
    abstract getPattern(): string;
    abstract getData(): string;
    abstract getOritinalMessage(): unknown;
    abstract getServiceRef(): SQS;
    abstract ack(err?: unknown): Promise<unknown>;
}
