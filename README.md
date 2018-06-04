# vue-component-toast
## Install
```sh
$ npm install --save vue-component-toast
```

## Usage

### Npm
```javascript
import toast from 'vue-component-toast'
import 'vue-component-toast/dist/css/vc-toast.min.css'

// Vue.use(toast, [<global-option>])
Vue.use(toast)

// Vue property
Vue.$toast('this is the prompt message.')

// Vue instance property
vm.$toast({ message: 'this is the prompt message.' })
```

### Script
```javascript
// Vue.use(window['vc-toast'], [<global-option>])
Vue.use(window['vc-toast'])

// Vue property
Vue.$toast('this is the prompt message.')

// Vue instance property
vm.$toast({ message: 'this is the prompt message.' })

```

## API
### Grammar: 
  - Vue.$toast(\<message> | \<Option>): toast
  - vm.$toast(\<message> | \<Option>): toast

### Option
| Parameter | Type | Default value | Optional value | Description |
| :--- | :--- | :--- | :--- | :--- |
| message | String |  |  | The prompt message |
| position | String | 'middle' | 'top', 'middle', 'bottom' | The location of the toast |
| duration | Number | 3000 |  | If it is less than or equal to 0, it means you need to close it manually  |
| className | String | | | The class name of Toast. You can add styles to it |
| iconClass | String | | | The class name of the icon icon |
| override | Boolean | true | | Overrides the prompt for the specified location |
| mask | Boolean | false | | No page interaction |

## Toast
### Instance methods
- toast.close(): Close the toast prompt

## License
MIT
