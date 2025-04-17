import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    Image,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useGetRolesOnPageQuery, useLoginUserMutation } from '../redux/service/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Slices/authSlice';
import { useCustomFonts } from './CustomHooks/useFonts';
import { result } from 'lodash';
import CustomizeButton from './Buttons/CustomizeButton';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CustomDropdownSelect from './DropDownSelect/DropDownSelect';
import { screenWidth } from './Utils/Screens';
import * as Updates from 'expo-updates';

function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Global,setGlobal]=useState(false)
    const [Id,setId]=useState()
    const [Globaldata,setGlobalData]=useState([])
    const [error, setError] = useState(null);
    const [loginUser, { isLoading }] = useLoginUserMutation();
    const [fadeAnim] = useState(new Animated.Value(0));
    const {fontsLoaded}=useCustomFonts()
    const navigation_use = useNavigation();
    const [GlobalSelected,setGlobalSelected]=useState()
   

    // Fetch roles on page based on username


    const OnSelectCompany=async ()=>{
        if(!GlobalSelected) return alert("Select Company")
            await AsyncStorage.setItem('userName', JSON.stringify({
                     userName:username,Id:Id,comcode:GlobalSelected?.value
                }));

            navigation.navigate('DashBoard');
            await Updates.reloadAsync();


    }

    const checkUserAuth=()=>{
        AsyncStorage.getItem("userName",async (error,result)=>{
            if(!error){
                if(result){
                   navigation.navigate("DashBoard")
                   navigation_use.reset({
                    index: 0,  // 0 is the index of the new screen.
                    routes: [{ name: 'DashBoard' }],  // The new screen you want to navigate to.
                  })
                  

                }
            }
        })
    }


    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        checkUserAuth()

    }, []);


    const validateInputs = () => {
        if (!username || !password) {
            Alert.alert('Validation Error', 'Username and password are required');
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        setError(null);
        if (!username || !password) {
            Alert.alert('Validation Error', 'Username and password are required');
            return;
        }
        try {
            // Send login request
            const data = await loginUser({ username, password }).unwrap();
            if (data.message === 'Login Successfull') {
                
                    setGlobal(true)
                    setGlobalData(data?.Global)
                    setId(data?.Id)
                // await AsyncStorage.setItem('userName', JSON.stringify({
                //     userName:username,Id:data?.Id
                // }));

                // navigation.navigate('DashBoard');

            } else {
                setError('Login failed, please try again.');
            }
        } catch (error) {
            setError(error.data ? error.data.message : error.message);
        }
    };

    return (
        <View
            style={styles.container}
        > 
             
             <View style={{height:"100%",width:"100%",bottom:0,position:"absolute",zIndex:-100,opacity:.4}}> 
            
            <Image
              
              style={{objectFit:"fill",width:"100%",height:"100%"}}
               source={{uri:"https://img.freepik.com/premium-vector/simple-curve-background-business-with-space-text_336924-5385.jpg?semt=ais_hybrid"}}
           /></View>
          
            <View style={{height:"100%",width:"100%",position:"absolute",top:0,borderBottomEndRadius:900}}> 
            
                 <Image
                    style={styles.pinn_logo}
                    source={require('./img/pin.a0917c99.png')}
                /></View>
         

                 
          
          {
            Global ? <View style={{marginTop:0}}>

<CustomDropdownSelect width={screenWidth-70}  placeholder={"Select Your Company"} items={Globaldata} selectedValue={GlobalSelected} setSelectedValue={setGlobalSelected} ></CustomDropdownSelect>
<CustomizeButton style={{ButtonOuter:{backgroundColor:"#add8f7",width:screenWidth-70,margin:"auto" ,borderWidth:0}}} onPress={OnSelectCompany}>Go</CustomizeButton>
                </View> :
                
                
                <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
                {/* Glassy Effect */}
               
                <View style={styles.glassCard}>
               <Image
                    style={styles.logo}
                    source={require('./img/bharani-small.png')}
                />
             
                    {error && <Text style={styles.errorText}>{error}</Text>}
                 <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Feather style={{position:"absolute",zIndex:10,marginLeft:7}} name="user" size={24} color="black" />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#999"
                        value={username}
                        onChangeText={setUsername}
                        keyboardType="default"
                    /></View>
                   <View style={{flexDirection:"row",alignItems:"center"}}>
                      <Feather style={{position:"absolute",zIndex:10,marginLeft:7}} name="lock" size={24} color="black" /><TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    /></View>
                    
                   


                   
                    <CustomizeButton style={ {ButtonOuter:{width:"42%",marginTop:9,left:"57%",borderTopRightRadius:10,borderBottomLeftRadius:0,flexDirection:"column",alignItems:"center",backgroundColor:"#3de3d5",borderColor:"#3de3d5"},ButtonText:{fontFamily:"",letterSpacing:3}}}  onPress={handleLogin}
                        disabled={isLoading}><Text>{isLoading ? 'Loading...' : 'Login'}</Text>{!isLoading && <Text style={{textAlign:"justify"}}><FontAwesome name="long-arrow-right"  size={12}   color="white" /></Text>}</CustomizeButton>
            </View>
            </Animated.View>


          }
            

            {/* Footer with Light Gradient */}
            <View
                colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.2)']} // Light gradient
                style={styles.footer}
            >
              
            </View>

            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position:"relative",
        zIndex:1,
    },
    card: {
        width: '90%',
        maxWidth: 400,
        borderRadius: 15,
        alignItems:"center",
        zIndex:10
    },
    glassCard: {
        padding: 25,
        borderRadius: 30,
        width:"90%",
        marginBottom:90,
        borderColor:"#f0f3f5",
        borderWidth:.3,
        shadowColor: '#403f3e', // shadow color
        shadowOffset: { width: 0, height: 100}, // shadow offset
        shadowOpacity: 0.1, // shadow opacity
        shadowRadius: 1,
        elevation:100,
        zIndex:100,
        backgroundColor:"white"
       
    },
    logo: {
        width:40,
        height: 40,
        alignSelf: 'center',
        resizeMode: 'contain',
        backgroundColor: 'white',
        paddingHorizontal: 100,
        borderRadius: 5,
        marginBottom:35
    }, pinn_logo: {
        width: "50%",
        height: "7%",
        alignSelf: 'center',
        resizeMode: 'contain',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop:0,
        position:"absolute",
        bottom:20,
    },
    input: {
        width: '100%',
        padding: 15,
        marginVertical: 10,
        borderWidth: .7,
        borderColor: 'rgba(157, 240, 240, 0.6)',
        borderRadius: 10,
        fontSize: 14,
        backgroundColor: 'rgba(173, 226, 226, 0.17)',
        color: '#18635d',
        letterSpacing:3,
        paddingLeft:34,
        fontFamily:"",placeholderTextColor:"#77f2d5",
        
        
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
       
    },
    button: {
        backgroundColor: '#7488e3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 20
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        width:"100%"
    },
});

export default LoginScreen;
