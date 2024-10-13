import {View, Image, TextInput, Text, TouchableOpacity} from 'react-native'



export const Login = ()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState({})
    console.log(password)
    console.log(email)

    const handleLogin = async ()=>{

        validationErrors = {}

        if (!email) {
            validationErrors.email = 'Email is required';
        }
        if (!password) {
            validationErrors.password = 'Password is required';   

        }
        
        setisLoading(true)
        try{
            const response =  await axios.post('http://192.168.198.86:7000/api/login', {
                email,
                password
            });
            data = response.data
            console.log(data.message)
            if(response.status == 200){
                console.log('login success')
            }
            else{
                console.error('error');
                alert(data.message)
                setError(data.message);
            }
        }
        catch(error){
            setError(data.message)
            alert(error)
        }
        finally{
            setisLoading(false)
        }
    };





    return (
        <View style={styles.layout}>
            <View style={styles.flex}>
                <Image source={require('../assets/logo.jpg')}/>
                <Text style={{
                    fontSize: 20,
                    fontWeight: '800',
                    }}>Login Account</Text>
            </View>

            <View style={{gap:24}}>
                <View style={{gap:28}}>
                    <View style={{gap: 12}}>
                        <Text style={styles.input_title}>Email</Text>
                        <TextInput
                            placeholder='email'
                            style={styles.type_input}
                            onChangeText={setEmail}
                            value={email}
                            >
                        </TextInput>
                    </View>

                    <View style={{gap: 12}}>
                        <Text style={styles.input_title}>Password</Text>
                        <TextInput
                            placeholder='password'
                            style={styles.type_input}
                            onChangeText={setPassword}
                            value={password}
                            >
                        </TextInput>
                    </View>
                </View>

                <Text style={{color: '#5D87FF'}}>
                    Forgot Password?    
                </Text>

                <TouchableOpacity 
                    style={styles.primary_btn}
                    onPress={handleLogin}
                    >
                    <View>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                        ) : (
                        <Text style={styles.primary_btn_text}>Login</Text>
                        )}
                    </View>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', justifyContent: 'center', gap: 4}}>
                    <Text style={{fontSize: 14}}>
                        Do not have an account?
                    </Text>
                    <TouchableOpacity style={styles.touch}>
                        <Text style={{color: '#5D87FF', fontWeight: '600' }}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 14, color: '#5D87FF'}}>Or</Text>
                </View>

                <View>
                    <DynamicBtn
                    onPress =  {() => handlePress()}

                    source={require('../assets/google.png')}
                    type={'secondary'}
                    name={'Sign in with Google'}
                    />
                </View>

                <View style={{top:24, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Terms | Policies</Text>
                </View>

            </View>
        </View>
    )
}
