odoo.define('website_device_visibility.snippets.options', function (require) {
'use strict';

const options = require('web_editor.snippets.options');
require('website.editor.snippets.options');
/**
 * Manage the visibility of snippets on mobile & desktop.
 */
options.registry.DeviceVisibility = options.Class.extend({
    isTopOption: true,

    /**
     * Allows to show or hide the associated snippet in mobile or desktop display mode.
     */
    toggleDeviceVisibility(previewMode, widgetValue, params) {
        this.$target[0].classList.remove('d-none', 'd-md-none', 'd-lg-none',
        );
        const style = getComputedStyle(this.$target[0]);
        this.$target[0].classList.remove(`d-md-${style['display']}`, `d-lg-${style['display']}`);
        if (widgetValue === 'no_desktop') {
            this.$target[0].classList.add('d-lg-none');
        } else if (widgetValue === 'no_mobile') {
            this.$target[0].classList.add(`d-lg-${style['display']}`, 'd-none');
        }
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * @override
     */
    async _computeWidgetState(methodName, params) {
        if (methodName === 'toggleDeviceVisibility') {
            const classList = [...this.$target[0].classList];
            if (classList.includes('d-none') &&
                    classList.some(className => className.match(/^d-(md|lg)-/))) {
                return 'no_mobile';
            }
            if (classList.some(className => className.match(/d-(md|lg)-none/))) {
                return 'no_desktop';
            }
            return '';
        }
        return await this._super(...arguments);
    },
});
});
