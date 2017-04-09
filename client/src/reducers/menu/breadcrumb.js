import navData from '../../raw-data/menu-data';
export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_URI': {
      let path = action.uri.pathname;
      let uri = (path === '/' ? '/index' : path);
      let breadcrumb = [];
      navData.find(item => {
        if (uri.indexOf(item.uri) >= 0) {
          breadcrumb.push(item);
        }
      });
      return breadcrumb;
    }
  }
  return state;
};
