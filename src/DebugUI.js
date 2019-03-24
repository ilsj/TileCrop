console.warn('DebugUI imported!');

export const DebugUI = {
    created: false,
    elements: undefined,
    minimized: false,

    create: function (position = 3, width = 128, maxHeight = 400) {
        if (DebugUI.created) return;
        DebugUI.created = true;

        const box = document.createElement('div');
        box.innerText = 'DebugUI';

        box.style.width = width + 'px';
        box.style.maxHeight = maxHeight + 'px';

        box.style.fontSize = '10px';
        box.style.position = 'absolute';
        box.style.background = '#eee';
        box.style.padding = '8px';
        box.style.overflowY = 'auto';

        switch (position) {
        case 0: // left-top
            box.style.left = 0;
            box.style.top = 0;
            break;
        case 1: // right-top
            box.style.right = 0;
            box.style.top = 0;
            break;
        case 2: // right-bottom
            box.style.right = 0;
            box.style.bottom = 0;
            break;

        default: // 3 left-bottom
            box.style.left = 0;
            box.style.bottom = 0;
        }

        const close = document.createElement('button');
        close.innerHTML = '&times;';
        close.style.float = 'right';
        close.style.margin = '-4px -1px';
        close.addEventListener('click', () => document.body.removeChild(box));
        box.appendChild(close);

        const minimize = document.createElement('button');
        minimize.innerHTML = '-';
        minimize.style.float = 'right';
        minimize.style.margin = '-4px -1px';
        minimize.addEventListener('click', () => {
            DebugUI.minimized = !DebugUI.minimized;
            DebugUI.elements.style.display = DebugUI.minimized ? 'none' : '';
        });
        box.appendChild(minimize);

        DebugUI.elements = document.createElement('div');
        box.appendChild(DebugUI.elements);

        DebugUI.addDivider();


        document.body.appendChild(box);
        // console.log('DebugUI created');
    },

    append: function (element, methodName = '', elementName = '') {
        if (!DebugUI.created) {
            console.error('DebugUI not created');
            return;
        }

        const div = document.createElement('div');
        div.style.margin = '4px';
        div.appendChild(element);
        DebugUI.elements.appendChild(div);

        // console.log('DebugUI: ', methodName, elementName);
    },

    addLabel: function (label) {
        const div = document.createElement('div');
        div.innerText = label;
        DebugUI.append(div, 'addLabel', label);
    },

    addDivider: function () {
        const hr = document.createElement('hr');
        hr.style.marginTop = '5px';
        hr.style.marginBottom = '5px';
        hr.style.borderTop = '1px solid #ccc';
        hr.style.clear = 'both';

        DebugUI.append(hr, 'addDivider');
    },

    addText: function (placeholder, onChange) {
        const input = document.createElement('input');
        input.type = 'text';
        input.style.width = '100%';
        input.placeholder = placeholder;

        DebugUI.addChangeEvent(input, onChange);

        DebugUI.append(input, 'addText', placeholder);
    },

    addNumber: function (placeholder, onChange) {
        const input = document.createElement('input');
        input.type = 'number';
        input.style.width = '100%';
        input.placeholder = placeholder;

        DebugUI.addChangeEvent(input, onChange);

        DebugUI.append(input, 'addNumber', placeholder);
    },

    addButton: function (caption, onClick) {
        const button = document.createElement('button');
        button.style.width = '100%';
        button.style.background = '#ccc';
        button.innerText = caption;

        DebugUI.addClickEvent(button, onClick);

        DebugUI.append(button, 'addButton', caption);
    },

    addColor: function (value = '#fff', onChange) {
        const input = document.createElement('input');
        input.type = 'color';
        input.style.width = '100%';
        input.style.padding = '0';
        input.value = value;

        DebugUI.addChangeEvent(input, onChange);

        DebugUI.append(input, 'addColor', value);
    },

    addRange: function (value, onChange) {
        const input = document.createElement('input');
        input.type = 'range';
        input.style.width = '100%';
        input.value = value;

        DebugUI.addChangeEvent(input, onChange);

        DebugUI.append(input, 'addSlider', value);
    },


    addClickEvent: function (element, onClick) {
        if (typeof onClick !== 'function') return;

        element.addEventListener('click', () => {
            onClick();
        });
    },

    addChangeEvent: function (element, onChange) {
        if (typeof onChange !== 'function') return;

        element.addEventListener('change', event => {
            onChange(event.currentTarget.value);
        });
    },
};
