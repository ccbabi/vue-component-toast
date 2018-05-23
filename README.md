# vue-component-toast
## Install
```sh
$ npm install --save vue-component-toast
```

## Usage
```javascript
import toast from 'vue-component-toast'
import '~vue-component-toast/dist/css/vc-toast.css'

Vue.use(toast)

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
| duration | Number | 3000 |  | Duration (in milliseconds), if -1 does not automatically close, the call instance close method can be manually closed |
| className | String | | | The class name of Toast. You can add styles to it |
| iconClass | String | | | The class name of the icon icon |
| override | Boolean | true | true, false | True means to clear all previous instances, using a new instance, or false, to use a new instance each time |

## Toast
### Instance methods
- toast.close(): Close the toast prompt

## License
MIT
