# *1. Getting Started*
```javascript
// Install Globally
sudo npm install -g create-react-app

// Create Project Files
create-react-app project_name

// Start React Server
npm start
// localhost:3000
```

# *2. Create React Elements*
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

class Message extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.msg}</h1>
      </div>
    )
  }
}



ReactDOM.render(<Message msg="how are you?"/>, document.getElementById('root'))
```


# *3. Refactor elements using Javascript as XML (JSX)*
