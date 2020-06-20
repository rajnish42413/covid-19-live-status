import React from "react";
import {View, Text, Alert, Image, FlatList, AsyncStorage, ScrollView } from "react-native";
import Axios from "axios";
import Loader from "../components/Loader";
import { IMovie,IData } from '../interfaces/Search';
import styles from "../assets/styles/style";
import { Button, Icon, WhiteSpace, SearchBar, Toast } from "@ant-design/react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { portal } from "@ant-design/react-native/lib/portal/portal-host";

interface IProps {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any,any>;
}

interface State {
  data: IData;
  loading: boolean;
  query:string
}

class Home extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      query:'marvel'
    };
  }

  getData = async (query:string) => {
    this.setState({ loading: true ,query:query});
    const { data } = await Axios.get(`http://www.omdbapi.com/?type=movie&apikey=a1b5f9ec&s=${query}`);
    console.log(data);
    this.setState({ data: data, loading: false });
  };


  async componentDidMount() {
    this.getData(this.state.query);
  }

  renderSeparator = () => {  
    return (  
        <View  
            style={{  
                height: 1,  
                width: "100%",  
                backgroundColor: "#000",  
            }}  
        />  
    );  
};  


 async _addToList (item:IMovie) { 
    const key = Toast.loading('Saving...');
    const storeData = await this.getStored();
    let listOfTasks;
    if(storeData){
       listOfTasks = [...[item],...storeData];  
    } else{
      listOfTasks = [...[item]]; 
    }
    listOfTasks = [...new Set(listOfTasks)];
    await AsyncStorage.setItem('listOfMovies', JSON.stringify(listOfTasks)); 
      const stored =  await this.getStored();
      Alert.alert("Saved Successfully");
  } 

async getStored(){
    const myArray = await AsyncStorage.getItem('listOfMovies');
    if(myArray) return JSON.parse(myArray);
}

  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <ScrollView
      style={styles.container}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
       <SearchBar 
        defaultValue={this.state.query} 
        placeholder="search by name" 
        style={{height:40,marginVertical:10}}
        onSubmit={value => this.getData(value)}
        />
        <WhiteSpace size="sm" />
       {
        this.state.data && <FlatList  
          data={this.state.data?.Search}  
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 5 ,backgroundColor:Colors.white}}>
               <Image style={styles.imageThumbnail} source={{ uri: item.Poster }} />
               <Text style={{textAlign:"center",fontSize:14}}>{item.Title},  <Text style={{textAlign:"center",fontSize:12}}>{item.Year}</Text></Text>
               <Button size="small" 
               onPress={()=>{this._addToList(item)}}
               style={{marginVertical:5 ,marginHorizontal:10}}>Save</Button>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      }
        { !this.state.data?.Search?.length && 
        <View style={[styles.container]} >
          <Icon name="smile" size={75} color={Colors.primary} style={{alignSelf:"center"}}/>
         <Text style={[styles.textMuted,{textAlign:"center"}]}>Sorry ! No Result Found</Text>
        </View>
       }
     </ScrollView>  
    );
  }
}

export default Home;
