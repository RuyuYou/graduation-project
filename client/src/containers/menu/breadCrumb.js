import Breadcrumb from '../../component/menu/BreadCrumb';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(Breadcrumb));
