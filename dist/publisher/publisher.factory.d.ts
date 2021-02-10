/*!
 * @contentstack/message-broker
 * Copyright(c) 2020 Contentstack LLC
 * MIT Licensed
 */
import { Publisher, PublisherOptions } from '../message-broker.types';
/**
 * PublisherFactory is used to choose appropriate Publisher's instance in PublisherModule
 * @internal
 */
export declare class PublisherFactory {
    static register(options: PublisherOptions): Publisher;
}
