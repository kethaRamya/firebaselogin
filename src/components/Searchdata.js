import React,{useState,useEffect} from 'react'
import {View,Text,TextInput,FlatList,StyleSheet,TouchableOpacity} from 'react-native';
import {getUser} from '../../redux/actions/index'
import {useSelector,useDispatch} from 'react-redux'
import auth, { firebase } from "@react-native-firebase/auth";

export default function SearchData(props){
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const [search, setSearch] = useState('');
    const [data,setData] = useState([])
    const [show,setShow] = useState(false)
    const [itemtext,setItemtext] = useState('')

    useEffect(() => {
        dispatch(getUser())
    })

    const ShowData = () => {
      if(show == false){
        setShow(true)
      }
      else if(show == true){
        setShow(false)
      }
      
    }
    const searchFilterFunction = (text) => {

            if (text) {
                const newData = user.filter(
                  function (item) {
                    const itemData = item.title
                      ? item.title.toUpperCase()
                      : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
                setData(newData);
                setSearch(text);
              } 
              else{
                setData(user)
                setSearch(text);
              }
        
    }

    const ItemText = (text) => {
      setItemtext(text)
    }
    const ItemView = ({item}) => {
        return (
          // Flat List Item
          <View>
          <Text
            style={styles.itemStyle}
            //onPress={() => getItem(item)}
            >
              {item.id}
              {'.'}
              {item.title}
          </Text>
          </View>
        );
      };
    
      const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8',
            }}
          />
        );
      };
    return(
        <View style={{marginTop:30}}>
          {show == false ? 
          <View>
          
            <View style={{flexDirection:"row",justifyContent:'space-around',marginBottom:10}}>
            <TouchableOpacity style={{backgroundColor:'#ddd' ,justifyContent:'center',padding:10}}
             onPress={ShowData}
            >
            <Text style={{textAlign:'center'}}>Add</Text>
            </TouchableOpacity>
             <TouchableOpacity
                  style={styles.loginButtonStyle}
                  onPress={async () => {
                    await firebase.auth().signOut();
                  }}
                >
                  <Text style={styles.loginButtonTextStyle}> Log Out</Text>
                </TouchableOpacity>
                </View>
           <TextInput 
            style={styles.textInputStyle}
            placeholder="Search"
            onChangeText={(text) => searchFilterFunction(text)}
          //onClear={(text) => searchFilterFunction('')}
          value={search}

           />
         <FlatList
          data={data}
          keyExtractor={(item, index) => item.id}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
        <Text style={styles.itemStyle}>{itemtext}</Text>
        </View>  : <View>
          <TextInput 
          style={styles.textInputStyle}
          placeholder="Add Item"
          onChangeText={(text) => {ItemText(text)}}
          value={itemtext}
          />

          <TouchableOpacity style={{backgroundColor:'#ddd' ,
          justifyContent:'center',padding:10,margin:20}}
            onPress={ShowData}
          >
            <Text style={{textAlign:'center'}}>Add</Text>
            </TouchableOpacity>
        </View>
} 
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    itemStyle: {
      padding: 10,
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
      },
      loginButtonStyle: {
        alignItems: "center"
      },
      loginButtonTextStyle: {
        color: "#ff0000"
      }
  });
