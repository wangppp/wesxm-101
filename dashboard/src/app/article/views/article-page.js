import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import EditIcon from 'material-ui-icons/Edit';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import {Button, Tooltip} from 'antd';
import {fetch} from '../../../services/http';
import {logOut} from '../../../services/auth';

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  fab: {
    paddingTop: '126px'
  },
});

const data = [];

class ArticlePage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: data
    }
  }

  addNew () {
    const {history} = this.props;
    history.push('/article/new');
  }

  editArticle (titleId) {
    const {history} = this.props;
    return e => {
      history.push(`/article/detail/${titleId}`);
    }
  }

  componentDidMount () {
    const {history} = this.props;
    fetch.get('/article_list').then(response => {
      const res = response.data;
      this.setState({
        data: res
      })
    }).catch(error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            logOut();
            alert(error.response.data.message);
            history.push('/login');
            break;
          default:
            return;
        }
      }
    })
  }

  render () {
    const {classes, history} = this.props;
    return (
      <Paper className={classes.paper} elevation={4}>
        <Typography type="headline" component="h2">
          文章管理
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>文章标题</TableCell>
              <TableCell>创建人</TableCell>
              <TableCell>创建时间</TableCell>
              <TableCell>更新时间</TableCell>
              <TableCell>编辑</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell>
                    <Typography type="subheading" component="h6">
                      {n.title}
                    </Typography>
                  </TableCell>
                  <TableCell>{n.author}</TableCell>
                  <TableCell>{n.created_at}</TableCell>
                  <TableCell>{n.updated_at}</TableCell>
                  <TableCell>
                    <IconButton color='accent' onClick={this.editArticle.bind(this)(n.route_title)} >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div style={{textAlign: 'right', marginTop: 20}}>
          <Tooltip title="新增文章">
            <Button onClick={this.addNew.bind(this)} type={'primary'} shape={'circle'} size={'large'} icon={'plus'}/>
          </Tooltip>
        </div>
      </Paper>
    )
  }
}

ArticlePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ArticlePage));