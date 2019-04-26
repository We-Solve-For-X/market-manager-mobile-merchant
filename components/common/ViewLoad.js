import React from 'react'
import { ActivityIndicator } from "react-native"
import { View } from 'react-native'

const ViewLoad = (props) => {
  const { children, hide, style } = props;
  if (hide) {
    return <ActivityIndicator/>
  }
  return (
    <View {...this.props} style={style}>
      { children }
    </View>
  );
};

// ViewLoad.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.element,
//     PropTypes.number,
//     PropTypes.arrayOf(PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.number,
//       PropTypes.element,
//     ])),
//   ]).isRequired,
//   style: View.propTypes.style,
//   hide: PropTypes.bool,
// };

export default ViewLoad