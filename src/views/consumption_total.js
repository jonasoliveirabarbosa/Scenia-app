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

import Pie from '../components/Pie';
import data from '../helpers/data';
import Theme from '../helpers/theme';

import {
    Text,
    Card,
    Tile,
    Icon,
    Avatar,
    ListItem
} from 'react-native-elements';

export default class consumptionTotal extends Component {

    state: State;
    spending: spending;

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            spendingsInYear: data.spendingsInYear
        };
        this._onPieItemSelected = this._onPieItemSelected.bind(this);
        this._shuffle = this._shuffle.bind(this);

        this.spending = {
            total: 1550,
            monthlyMean: 153
        };
    }

    _onPieItemSelected(newIndex) {
        this.setState({
            ...this.state,
            activeIndex: newIndex,
            spendingsInYear: this._shuffle(data.spendingsInYear)
        });
    }

    _shuffle(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [
                a[i - 1],
                a[j]
            ] = [
                a[j],
                a[i - 1]
            ];
        }
        return a;
    }

    render() {
        const height = 200;
        const width = 500;
        const renderRow = ({item}) => {
            return (<ListItem title={item.title} leftIcon={{
                    name: item.icon
                }} chevron="chevron" bottomDivider/>);
        };

        return (<ScrollView>
            <View style={styles.container}>
                <Card containerStyle={{
                        marginTop: 15
                    }}>
                    <Text style={styles.fonts} h3>
                        Consumo Geral
                    </Text>
                    <View style={styles.list}>
                        <ListItem title={'Total gasto Geral'} titleStyle={{
                                color: 'black'
                            }} rightTitle={this.spending.total} rightTitleStyle={{
                                color: 'black'
                            }} bottomDivider/>
                        <ListItem title={'Gasto médio Mensal'} titleStyle={{
                                color: 'black'
                            }} rightTitle={this.spending.monthlyMean} rightTitleStyle={{
                                color: 'black'
                            }} bottomDivider/>
                    </View>
                </Card>
                <Card containerStyle={{
                        marginTop: 15
                    }}>
                    <Text style={styles.fonts} h3>
                        Aparelhos mais usados
                    </Text>
                    <Pie pieWidth={150} pieHeight={150} onItemSelected={this._onPieItemSelected} colors={Theme.colors} width={width} height={height} data={data.spendingsLastMonth}/>
                </Card>
                <Card containerStyle={{
                        marginTop: 15
                    }}>
                    <Text style={styles.fonts} h3>
                        Aparelhos com pior eficiência
                    </Text>
                    <Pie pieWidth={150} pieHeight={150} onItemSelected={this._onPieItemSelected} colors={Theme.colors} width={width} height={height} data={data.spendingsLastMonth}/>
                </Card>
                <Card containerStyle={{
                        marginTop: 15
                    }}>
                    <Text style={styles.fonts} h3>
                        Aparelhos com melhor eficiência
                    </Text>
                    <Pie pieWidth={150} pieHeight={150} onItemSelected={this._onPieItemSelected} colors={Theme.colors} width={width} height={height} data={data.spendingsLastMonth}/>
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
