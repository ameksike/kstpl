# KsTpl: Template Compilation Made Easy

KsTpl is a versatile and extensible Node.js library designed for seamless template compilation in various formats, including Markdown, Twig, EJS, and more. It's a part of the robust Ksike ecosystem, ensuring reliability and compatibility with a range of applications.

## Key Features:

- Format Agnostic: KsTpl supports multiple template formats, allowing you to work with your preferred syntax effortlessly.
- Extensibility: Easily integrate new template formats by creating custom drivers. KsTpl follows a simple and intuitive driver concept.
- Cache Management: Benefit from an efficient caching system that you can adapt to your needs, ensuring optimal performance.

This library belong to the *Ksike* ecosystem:
- [KsMf](https://www.npmjs.com/package/ksmf) - Microframework (WEB, REST API, CLI, Proxy, etc)
- [Ksdp](https://www.npmjs.com/package/ksdp) - Design Patterns Library (GoF, GRASP, IoC, DI, etc)
- [KsCryp](https://www.npmjs.com/package/kscryp) - Cryptographic Library (RSA, JWT, x509, HEX, Base64, Hash, etc) 
- [KsHook](https://www.npmjs.com/package/kshook) - Event Driven Library
- [KsEval](https://www.npmjs.com/package/kseval) - Expression Evaluator Library 
- [KsWC](https://www.npmjs.com/package/kswc) - Web API deployment Library
- [KsTpl](https://www.npmjs.com/package/kstpl) - Template Engine
- [KsDoc](https://www.npmjs.com/package/ksdoc) - Document Engine

## Driver
- [Template Simple: String interpolation](./doc/driver.str.md)
- [Template Ejs](./doc/driver.ejs.md)
- [Template Twig: based on Twing Library](./doc/driver.twing.md)
- [Template Twig: based on Twig Library](./doc/driver.twig.md)
- [Template Markdown](./doc/driver.markdown.md)
- [Template Markdown: based on marked Library](./doc/driver.marked.md)