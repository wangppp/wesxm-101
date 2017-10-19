import React, {Component} from 'react';
import {fetch} from '../../../services/http';
import {Card, message} from 'antd';
class ArticleDetail extends Component {

  constructor (props) {
    super(props);
    this.state = {
      article: {
        title: '',
        content: ''
      },
      loading: true
    }
  }

  componentDidMount () {
    const {match} = this.props;
    fetch(`/article/detail/${match.params.titleId}`).then(
      response => {
        this.setState({
          article: response.data,
          loading: false
        });
      },
      error => {
        this.setState({
          loading: false
        });
      }
    )
  }

  render () {
    return (
      <Card loading={this.state.loading} title={this.state.article.title}>
        {this.state.article.content}
      </Card>
    );
  }
}

export default ArticleDetail;


