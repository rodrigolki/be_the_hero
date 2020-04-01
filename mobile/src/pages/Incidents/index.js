import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import css from './styles';

export default function Incidents() {
	const [incidents, setIncidents] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const navigation = useNavigation();

	function navigateToDetail(incident) {
		navigation.navigate('Detail', { incident });
	}

	async function loadIncidents(){
		if(loading) return;
		if(total > 0 && incidents.total == total) return;

		setLoading(true);
		const res = await api.get('incidents',{
			params: { page }
		});

		setIncidents([... incidents, ... res.data]);
		setTotal(res.headers['x-total-count']);
		setLoading(false);
		setPage(page + 1);
	}

	useEffect(() =>{
		loadIncidents();
	}, [])

	return (
		<View style={css.container}>
			<View style={css.header}>
				<Image source={logoImg} />
				<Text style={css.headerText}>
					Total de <Text style={css.headerTextBold}>{total} casos</Text>.
				</Text>
			</View>

			<Text style={css.title}>
				Bem Vindo!
			</Text>
			<Text style={css.description}>
				Escolha um dos casos e salve o dia.
			</Text>

			<FlatList
				style={css.incidentsList}
				data={incidents}
				keyExtractor={incident => String(incident.id)}
				showsVerticalScrollIndicator={false}
				onEndReached={loadIncidents}
				onEndReachedThreshold={0.2}
				renderItem={({ item: incident }) => (
					<View style={css.incident}>
						<Text style={css.incidentProperty}>
							ONG:
						</Text>
						<Text style={css.incidentValue}>
							{incident.nome}
						</Text>

						<Text style={css.incidentProperty}>
							Caso:
						</Text>
						<Text style={css.incidentValue}>
							{incident.title}
						</Text>
						
						<Text style={css.incidentProperty}>
							VALOR:
						</Text>
						<Text style={css.incidentValue}>
							{Intl.NumberFormat('pt-BR', {style: 'currency', currency : 'BRL' }).format(incident.value)}
						</Text>

						<TouchableOpacity 
							style={css.detailsButton} 
							onPress={() => navigateToDetail(incident)}
						>
							<Text style={css.detailsButtonText}>
								Ver mais detalhes
							</Text>
							<Feather name="arrow-right" size={16} color="#E02041"/>
						</TouchableOpacity>
					</View>
				)}
			
			/>
		</View>
	)  
}