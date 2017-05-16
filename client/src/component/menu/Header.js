import {Component} from 'react';
import {NavDropdown, MenuItem} from 'react-bootstrap';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  componentDidMount() {
    superagent
      .get('/login/username')
      .use(noCache)
      .end((err, res) => {
        if (err) {
          throw err;
        } else {
          this.setState({username: res.body.userName});
        }
      });
  }

  render() {
    return (
      <div>
        <div className='header' id='header'>
          <i className='fa fa-leaf'> </i>
          火车后台管理
          <div className='nav-user-info pull-right'>
            <a><font color='white'><i className='fa fa-bell'> </i></font></a>
            <NavDropdown eventKey={1} title={this.state.username} id='basic-nav-dropdown'
                         className='menu-drop no-padding nav-inline margin-left'>
              <MenuItem eventKey={1.1}>
                <button className='btn btn-default'>
                  <i className='fa fa-power-off nav-inline'> </i>
                  &nbsp; 退出
                </button>
              </MenuItem>
            </NavDropdown>
          </div>
        </div>
      </div>
    );
  }
}
