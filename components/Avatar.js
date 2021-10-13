import { StyleSheet, Image} from 'react-native';
import React from 'react';
import styled from 'styled-components';

export default (props) => (
    // <Image style={styles.container} source={require("../assets/profile.png")}/>
    <AvatarImage source={require("../assets/profile.png")}/>
);

// const styles = StyleSheet.create({
//     container: {
//         width: 60,
//         height: 60,
//         backgroundColor: 'black',
//         borderRadius: 30
//     }
// });

const AvatarImage = styled(Image)`
    width: 60px;
    height: 60px;
    background-color: #334455;
    border-radius: 30px;
`;