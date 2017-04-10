import {Component} from 'react';
import {InputWrapper} from '../common';
import validate from 'validate.js';
import superagent from 'superagent';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import constant from '../../../../config/constant';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accountError: '',
      passwordError: '',
      loading: false
    };
  }

  checkLogin(e) {
    e.preventDefault();

    if (this.validateInput()) {
      this.setState(this.validateInput());
    } else {
      this.setState({
        loading: true,
        accountError: '',
        passwordError: '',
      }, () => {
        const account = this.account.value;
        const password = this.password.value;
        console.log({account, password});
        superagent.post('/login')
          .send({account, password})
          .end((err, res) => {

            console.log(res.statusCode)
            if (res.statusCode === 200) {
              this.props.router.push('/');

            }
            this.setState({loading: false});
            if (res.body.status === constant.httpCode.UNAUTHORIZED) {
              this.setState({
                accountError: '用户名或密码错误',
                passwordError: '用户名或密码错误'
              });
            } else if (res.body.status === constant.httpCode.OK) {
              this.props.dispatch({
                type: 'NO_USER',
                authState: res.body.status
              });
              this.props.router.push('/');
            }
          });
      });
    }
  }

  validateInput() {
    const constraints = {
      account: {
        presence: {
          message: '^用户名不能为空'
        }
      },
      password: {
        presence: {
          message: '^密码不能为空'
        }
      }
    };

    const account = this.account.value;
    const password = this.password.value;
    const errorInputMessage = validate({account, password}, constraints);
    const validateResult = {};

    for (let key in errorInputMessage) {
      validateResult[key + 'Error'] = errorInputMessage[key][0];
    }
    return errorInputMessage ? validateResult : undefined;
  }

  render() {
    return (
      <div id='login-form' className='col-md-4 col-md-offset-4 col-sm-offset-2 col-sm-8 col-xs-offset-1 col-xs-10'>
        <div className='login-main'>
          <h4 className='header'>
            <i className='fa fa-coffee'> </i>
            <span className='blue'>请输入您的信息</span>
          </h4>
          <div>
            <InputWrapper warning={this.state.accountError}>
              <div className={!this.state.accountError ? 'input-info row' : 'input-info-null row'}>
                <div className='col-xs-11 no-padding'>
                  <input type='text' className='input-form col-xs-12' ref={(ref) => {
                    this.account = ref;
                  }}
                         placeholder='邮箱'/>
                </div>
                <i className='input-icon fa fa-user col-xs-1 text-center'> </i>
              </div>
            </InputWrapper>
            <InputWrapper warning={this.state.passwordError}>
              <div className={!this.state.passwordError ? 'input-info row' : 'input-info-null row'}>
                <div className='col-xs-11 no-padding'>
                  <input type='password' className='input-form col-xs-12' ref={(ref) => {
                    this.password = ref;
                  }}
                         placeholder='密码'/>
                </div>
                <i className='input-icon fa fa-lock col-xs-1 text-center'> </i>
              </div>
            </InputWrapper>

            <div className='form-footer row'>
              <div className='checkbox col-xs-8'>
                <label>
                  <input type='checkbox'/> 记住我
                </label>
              </div>
              <div className='col-xs-4'>
                <button type='button' className='pull-right btn btn-sm btn-primary'
                        onClick={this.checkLogin.bind(this)} disabled={this.state.loading ? 'disabled' : ''}>
                  <i className='fa fa-key'> </i>
                  <span className='bigger-110'>登&nbsp;录</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        <div className='footer'>

          <div className='forgot'>
            <a href='#' data-target='#signup-box' className='user-forgot-link pull-right'>
              忘记密码 &nbsp;
              <i className='ace-icon fa fa-arrow-right'> </i>
            </a>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(() => {
  return {};
})(withRouter(LoginForm));
