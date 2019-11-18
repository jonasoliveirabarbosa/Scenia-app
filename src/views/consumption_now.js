import React, {useState, Component} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    FlatList,
    Dimensions
} from 'react-native';
import colors from '../config/colors';
import _ from 'lodash';
import {range, random} from "lodash";
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import lightFormat from 'date-fns/lightFormat';
import {Decimal} from 'decimal.js';

import {
    Text,
    Card,
    Tile,
    Icon,
    Avatar,
    ListItem
} from 'react-native-elements';

import Theme from '../helpers/theme';

import { AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'

export default class consumptionNow extends Component {
    devicesOn: devicesOn;

    constructor(props) {
        super(props);
        this.state ={ 
          isLoading: true,
          dataSource: [],
          consumptionUntillNow: 0,
          totalConsumption: 0,
          calculatedConsumption: 0,
        };
    }
    
    componentDidMount(){
      try {
          setInterval(async () => {
            const res = await fetch('http://teste-env.n5mm339hk7.us-east-1.elasticbeanstalk.com/api/sensor_informations/1');
            const response = await res.json();
            const requestValues = this.state.dataSource;
            
            let responseWithDate = response;
            responseWithDate.send_at = new Date(response.send_at);
            requestValues.push(responseWithDate);
            this.setState({
              dataSource: requestValues,
            });
            decimalCurrentValue = new Decimal(response.value);
            
            this.setState({
                totalConsumption: (decimalCurrentValue.add(new Decimal(this.state.totalConsumption)))
            });
            
            totalConsumptionDecimal = new Decimal(this.state.totalConsumption);
            lengthDecimal = new Decimal(this.state.dataSource.length);
            valueBill = new Decimal(0.484);
            previsionLenght = new Decimal(518400);
            consumptionUntillNowDecimal = new Decimal(this.state.consumptionUntillNow)
            
            consumptionNow = (decimalCurrentValue.dividedBy(1000).dividedBy(720).times(valueBill));
            consumptionUntillNowDecimal = consumptionUntillNowDecimal.add(consumptionNow); 
            
            this.setState({
              consumptionUntillNow: consumptionUntillNowDecimal
            });
            
            this.setState({
              calculatedConsumption: (consumptionUntillNowDecimal.dividedBy(lengthDecimal).times(previsionLenght))
            });      
          }, 5000);
        } catch(e) {
          console.log(e);
        }
    }

    render() {
        const renderRow = ({item}) => {
            return (<ListItem onPress={log} title={item.title} leftIcon={{
                name: item.icon
            }} chevron="chevron" bottomDivider="bottomDivider"/>);
        };
        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30

        return (
          <ScrollView>
            <View style={styles.container}>
                <Card containerStyle={{
                        marginTop: 15
                    }}>
                    <Text style={styles.fonts} h3>
                        Calculo de Consumo
                    </Text>
                    <View style={styles.list}>
                        <ListItem title={'Total gasto'} titleStyle={{
                                color: 'black'
                            }} rightTitle={(this.state.consumptionUntillNow.toFixed(2) > 0) ?
                              `R$ ${this.state.consumptionUntillNow.toFixed(2)}` : `menos de um centavo`  
                            } rightTitleStyle={{
                                color: 'black'
                            }} bottomDivider/>
                        <ListItem title={'Previsão'} titleStyle={{
                                color: 'black'
                            }} rightTitle={`R$ ${this.state.calculatedConsumption.toFixed(2)}`} rightTitleStyle={{
                                color: 'black'
                            }} bottomDivider/>
                        <ListItem title={'Consumo Total'} titleStyle={{
                                color: 'black'
                            }} rightTitle={`W ${this.state.totalConsumption.toFixed(2)}`} rightTitleStyle={{
                                color: 'black'
                            }} bottomDivider/>
                    </View>
                </Card>
                <Card containerStyle={{
                        marginTop: 15
                    }}>
                    <Text style={styles.fonts} h3>
                        Consumo x Tempo
                    </Text>
                   <View style={{ height: 400, padding: 10, flexDirection: 'row' }}>
                      <YAxis
                        data={this.state.dataSource}
                        style={{ marginBottom: xAxisHeight }}
                        contentInset={verticalContentInset}
                        svg={axesSvg}
                        numberOfTicks={10}
                        formatLabel={(value) => `${value}W`}
                        yAccessor={ ({ item }) => item.value }
                      />
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <AreaChart
                          style={{ flex: 1 }}
                          data={this.state.dataSource}
                          xScale={ scale.scaleTime }
                          yAccessor={ ({ item }) => item.value }
                          xAccessor={ ({ item }) => item.send_at }
                          svg={{ fill: '#ddebab' }}
                          contentInset={{ top: 10, bottom: 10 }}
                          >
                          <Grid />
                        </AreaChart>
                        <XAxis
                          data={this.state.dataSource}
                          svg={{
                            fill: 'black',
                            fontSize: 8,
                            fontWeight: 'bold',
                            rotation: 30,
                            originY: 30,
                            y: 5,
                          }}
                          xAccessor={ ({ item }) => item.send_at }
                          scale={ scale.scaleTime }
                          numberOfTicks={ 6 }
                          style={{ marginHorizontal: -15, height: 20 }}
                          contentInset={{ left: 10, right: 25 }}
                          formatLabel={ (value) =>  lightFormat(value, 'HH:mm:ss') }
                        />
                      </View>
                    </View>
                </Card>
            </View>
        </ScrollView>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        alignItems: "center"
    },
    list: {
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: colors.greyOutline,
        backgroundColor: '#fff'
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#FD6B78'
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22
    },
    fonts: {
        marginBottom: 8
    },
    user: {
        flexDirection: 'row',
        marginBottom: 6
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10
    },
    name: {
        fontSize: 16,
        marginTop: 5
    },
    social: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }
});
