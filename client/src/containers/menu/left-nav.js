import LeftNav from '../../component/menu/LeftNav';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(LeftNav));
