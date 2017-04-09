import Header from '../../component/menu/Header';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    // exit: () => {
    //   dispatch(logout());
    // },
    // resetLogout: () => {
    //   dispatch({type: 'RESET_LOGOUT'});
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
