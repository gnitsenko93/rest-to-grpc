'use strict';

function factoryController(ControllerConstructor, options) {
    const controller = new ControllerConstructor(options);

    return controller.handler.bind(controller);
}

module.exports = factoryController;