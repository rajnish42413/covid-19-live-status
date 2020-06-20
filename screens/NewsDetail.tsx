import React, { Component } from 'react'
import { WebView } from 'react-native-webview';

export default class NewsDetail extends Component<any,any> {
    render() {
        const url =  this.props.route?.params?.news.url ?? 'https://www.google.com/';
        console.log(url);
        return <WebView source={{ uri: url }} style={{ marginTop: 5 }} />;
      }
}
