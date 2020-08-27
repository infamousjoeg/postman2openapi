import { default as collection } from './collection';
import CodeMirror from 'codemirror/lib/codemirror.js';
import * as postman2openapi from "postman2openapi";

const postmanElement = CodeMirror.fromTextArea(document.getElementById('postman'), {
    lineNumbers: true
});

postmanElement.setValue(JSON.stringify(collection, 0, 2));

postmanElement.on('change', (_) => {
    update();
});

const openapiElement = CodeMirror.fromTextArea(document.getElementById('openapi'), {
    readOnly: true
});

const update = () => {
    console.log('updating');
    console.log(postmanElement);
    const postman = postmanElement.getValue();
    try {
        const openapi = postman2openapi.transpile(postman, 'yaml');
        openapiElement.setValue(openapi);
    } catch (e) {
        openapiElement.setValue(e);
    }
};

update();