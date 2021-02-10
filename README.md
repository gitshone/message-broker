
## Overview

Delayed Jobs Framework consists of NestJS and Contentstack Message Broker (extended @nestjs/microservices).

![](https://lh5.googleusercontent.com/7sVhr8kLkAJoF5RiTXZk1wZrdUg8j8oIObV86er-dAqUcdFNElkChFln53vyACdjdOPJUGqCOmppqGH8DT5VAAcqBw9NpySqbgnoiFJvqUzboHeMPha4qblmz2QXgpEXIkhYPmca)

Contentstack Message Broker supports several built-in message broker services like SQS, Firebase, SNS, RabbitMQ, and Redis. Message broker services are responsible for transmitting messages between different microservice instances. It natively supports both request-response and event-based message styles. Contentstack Message Broker abstracts the implementation details of each transporter behind a canonical interface for both request-response and event-based messaging. This makes it easy to switch from one message broker service to another -- for example to leverage the specific reliability or performance features of a particular transport layer -- without impacting your application code.

Also refer to NestJS [Microservices](https://docs.nestjs.com/microservices/basics) documentation along with this.

## Installation
To start building microservices, first install the required package:

    $ npm i --save @nestjs/microservices @contentstack/message-broker

## Getting started
Contentstack Message Broker does support subscribe and publish services as follows.

### Terminology

Contentstack Message Broker is an extended service from `@nestjs/microservices`. Also, there is change in terminology as follows:

The `Publisher` class extends the `ClientProxy` class from the `@nestjs/microservices` package.

The `Subscriber` class extends the `Server` class and implements `CustomTransportStrategy`

from the `@nestjs/microservices` package.

The `MessageBroker` enum refers to `Transport` from the `@nestjs/microservices` package, but it supports SQS, SNS (only publisher), Firebase, RabbitMQ, and Redis message brokers.

For initialization or registration of Publisher and Subscriber use following documentation.

### Subscriber

To instantiate a microservice, use the `createMicroservice()` method of the `NestFactory` class and to load microservice, use the `subscriber()` method of the `MessageBrokerFactory` class.

    // main.ts
    
    import { NestFactory } from '@nestjs/core'
    import { MicroserviceOptions } from '@nestjs/microservices'
    import { MessageBrokerFactory, MessageBroker } from '@contentstack/message-broker'
    import { AppModule } from './app.module'
     
    async function bootstrap() {
      const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        MessageBrokerFactory.subscriber({
		    'subscriber': MessageBroker.SQS, //‘SQS/Firebase/RabbitMQ/Redis’
		    'config': {config},
		    'options': {options},
        }),
      )
      await app.listenAsync()
    }
    bootstrap()

To create a message handler based on the request-response paradigm use the `@MessagePattern()` decorator, which is imported from the `@nestjs/microservices` package.

    //job-processor.controller.ts

    import { Publisher, SubscriberContext } from '@contentstack/message-broker'
    import { Controller } from '@nestjs/common'
    import { Ctx, MessagePattern, Payload } from '@nestjs/microservices'
	 
	@Controller()
	export class JobProcessorController {
	  @MessagePattern(‘action’)
	  process(@Payload() data: any, @Ctx() context: SubscriberContext): Promise<void> {
		//TODO: perform task
		return Promise.resolve()
	  }
	}

### Publisher

To instantiate a microservice publisher client, the `publisher()` method of the `MessageBrokerFactory` class.

    //app.module.ts
    
    import { MessageBrokerFactory, MessageBroker } from '@contentstack/message-broker'
     
    @Module({
     imports: [
       MessageBrokerFactory.publisher([{
    	'name': 'DEMO_PUBLISH',
    	'publisher': MessageBroker.SQS,
	    'config': {config},
	    'options': {options},
       }]),
       ...
     ],
     ...
    })

Once the module has been imported, we can inject an instance of the `Publisher` configured as specified via the `'DEMO_PUBLISH'` transporter options shown above, using the `@Inject()`  decorator.

    //job-publisher.controller.ts
     
    import { Controller, Inject } from '@nestjs/common'
    import { MessagePattern } from '@nestjs/microservices'
    import { Publisher } from '@contentstack/message-broker'
     
    @Controller()
    export class JobPublisherController {
     
      constructor(@Inject('DEMO_PUBLISH') private publisher: Publisher) {}
     
      async notify(): Promise<void> {
        return publisher.publish({message})
      }
    }

 
### Filters

There is no change in following classes and decorators. Follow `@nestjs/microservices` package documentation for any given use cases.
  
-   [Exception filters](https://docs.nestjs.com/microservices/exception-filters)
-   [Pipes](https://docs.nestjs.com/microservices/pipes)
-   [Guards](https://docs.nestjs.com/microservices/guards)
-   [Interceptors](https://docs.nestjs.com/microservices/interceptors)

## License

@contentstack/message-broker is  [MIT licensed]([https://github.com/contentstack/microservice-packages/blob/master/packages/message-broker/LICENSE](https://github.com/contentstack/microservice-packages/blob/master/packages/message-broker/LICENSE)).