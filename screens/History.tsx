import React from "react";
import {View, Text, Alert, Image, FlatList, AsyncStorage, ScrollView, RefreshControl } from "react-native";
import Axios from "axios";
import Loader from "../components/Loader";
import { IMovie,IData } from '../interfaces/Search';
import styles from "../assets/styles/style";
import { Button, Icon, WhiteSpace, SearchBar, Toast } from "@ant-design/react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import Colors from "../constants/Colors";

interface IProps {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any,any>;
}

interface State {
  data: IMovie[];
  loading: boolean;
  query:string;
  refreshing:boolean
}

class History extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      refreshing:false
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getData();
    this.setState({ refreshing: false });
  };

  getData = async () => {
    this.setState({ loading: true});
    const data  = await this.getStored();
    this.setState({ data: data, loading: false });
  };


  async componentDidMount() {
    this.getData();
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
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            style={styles.container}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          > 
        <WhiteSpace size="sm" />
       {
        this.state.data && <FlatList  
          data={this.state.data}  
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 5 ,backgroundColor:Colors.white}}>
               <Image style={styles.imageThumbnail} source={{ uri: item.Poster }} />
               <Text style={{textAlign:"center",fontSize:14,paddingBottom:10}}>{item.Title},  <Text style={{textAlign:"center",fontSize:12}}>{item.Year}</Text></Text>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      }
        { !this.state.data?.length && 
        <View style={[styles.container]} >
          <Icon name="smile" size={75} color={Colors.primary} style={{alignSelf:"center"}}/>
         <Text style={[styles.textMuted,{textAlign:"center"}]}>Sorry ! No Result Found</Text>
        </View>
       }
     </ScrollView>  
    );
  }
}

export default History;
