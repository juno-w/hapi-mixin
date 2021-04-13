# HAPI Vue Form Mixins

This mixin is for HAPI Form to post data to the backend server and get responses returned by the server. You can reuse this mixin if your website has more than one form without having to write your own repetitively.

Technically, you can use this mixin on any project as long as the backend is built on top of Laravel or your backend returns the same response structures as Laravel.

### [Pre-installation](#pre_installation)

If your computer doesn't have [bit.dev](https://bit.dev/) installed, you would need to run this command to enable `npm` or `yarn` able to talk `bit.dev`.

Kindly run this command.
```
npm config set @bit:registry https://node.bit.dev
```

### [Installation](#installation)

Via npm
```
npm i @bit/voon.vue.mixins.hapi-mixin
```

Via yarn
```
yarn add @bit/voon.vue.mixins.hapi-mixin
```

### [Usage](#usage)

#### Import `hapi-mixin` into your Vue component.

```js
import HapiMixin from '@bit/voon.vue.mixins.hapi-mixin';

export default {
    mixins: [HapiMixin],
    data() {
        return {
            action: 'Endpoint URL here',
            redirect: '/thank-you',
        }
    }
    ...
}
```

#### Secondly, your markups should look something like this.

```html
<form @submit.prevent="submit">
  <div>
    <label style="display: block">Name</label>
    <input type="text" v-model="fields.name" />
    <p v-if="errors && errors.name" v-text="errors.name[0]"></p>
  </div>
  <div>
    <label style="display: block">Email</label>
    <input type="email" v-model="fields.email" />
    <p v-if="errors && errors.email" v-text="errors.email[0]"></p>
  </div>
  <div>
    <label style="display: block">Phone</label>
    <input type="text" v-model="fields.phone" />
    <p v-if="errors && errors.phone" v-text="errors.phone[0]"></p>
  </div>
  <div>
    <label style="display: block">Message</label>
    <textarea type="text" v-model="fields.message"></textarea>
    <p v-if="errors && errors.message" v-text="errors.message[0]"></p>
  </div>
  <button type="submit">Submit</button>
</form>
```

### [API](#api)
#### `redirect` property

If `redirect` is set, the form will redirect to the destination accordingly using Vue's router `push()` method for internal link.

```js
import HapiMixin from '@bit/voon.vue.mixins.hapi-mixin';

export default {
    mixins: [HapiMixin],
    data() {
        return {
            action: 'Endpoint URL here',
            redirect: '/thank-you',
        }
    }
    ...
}
```

If your redirect is external URL such as `google.com`. Please provide full URL with http/https scheme.

```js
import HapiMixin from '@bit/voon.vue.mixins.hapi-mixin';

export default {
    mixins: [HapiMixin],
    data() {
        return {
            action: 'Endpoint URL here',
            redirect: 'https://www.google.com',
        }
    }
    ...
}
```


#### `statusCode()` watcher

If your project does not require any redirection, you can use `watch` method to watch the status code returned by the server. For instance, you wanted to show custom message based on the [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). You can do something like this.

```js
import HapiMixin from '@bit/voon.vue.mixins.hapi-mixin';

export default {
    ...
    watch: {
        statusCode(code) {
            if (code > 200 && code < 400) {
                alert('Form is submitted!')
            }
        }
    }
    ...
}
```

#### `resetFields()` method

If you want your form able to clear all fields, simply call `this.resetFields()` method.

#### `responseMessage` property

Get the server response message whether it is failed or success.

#### Tips
1. You don't need to declare the field name at the `data()`. Use dot notation to assign the field name within the `fields: {}` instead. Typically, your component would only have `action` and `redirect` properties and rest the mixin will do it behind the scene.

2. Giving bad URL will cause error. Please provide a valid URL if you wish to redirect to external link.

3. Use environment variable to store your base API endpoint when your website have more than 1 form.

Example of using environment variable (`.env`) to store base API endpoint.

```
NUXT_ENV_API_ENDPOINT=https://app.example.com/api/e4a35782-1349-4e75-ab53-fca0e85d0483/forms
```

```js
// Booking form
import HapiMixin from '@bit/voon.vue.mixins.hapi-mixin';

export default {
    mixins: [HapiMixin],
    data() {
        return {
            action: process.env.NUXT_ENV_API_ENDPOINT + "/23",
            redirect: 'https://www.google.com',
        }
    }
    ...
}

// https://app.example.com/api/e4a35782-1349-4e75-ab53-fca0e85d0483/forms/23

---

// Enquiry form
import HapiMixin from '@bit/voon.vue.mixins.hapi-mixin';

export default {
    mixins: [HapiMixin],
    data() {
        return {
            action: process.env.NUXT_ENV_API_ENDPOINT + "/45",
            redirect: 'https://www.google.com',
        }
    }
    ...
}

// https://app.example.com/api/e4a35782-1349-4e75-ab53-fca0e85d0483/forms/45
```