import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';


import logoImg from '../../assets/logo.png';
import css from './styles';

export default function Detail() {

	const navigation = useNavigation();
	const route = useRoute();

	const inc = route.params.incident;
	
	const bodyMail = `Olá ${inc.nome}, estou entrando em contato pois gostaria de ajudar no caso "${inc.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency : 'BRL' }).format(inc.value)}`;

	function navigateBack() {
		navigation.goBack();
	}

	function sendMail() {
		MailComposer.composeAsync({
			subject: `Herói do caso : ${inc.title}`,
			recipients : [inc.email],
			body: bodyMail
		})
	}

	function sendWhats() {
		Linking.openURL(`whatsapp://send?phone=${inc.whatsapp}&text=${bodyMail}`);
	}

	return (
		<View style={css.container}>
			<View style={css.header}>
				<Image source={logoImg} />
				<TouchableOpacity 
					style={css.backButton} 
					onPress={navigateBack}
				>
					<Feather name="arrow-left" size={28} color="#E02041"/>
				</TouchableOpacity>
			</View>


			<View style={css.incident}>
				<Text style={css.incidentProperty}>
					ONG:
				</Text>
				<Text style={css.incidentValue}>
					{inc.nome} de {inc.city} / {inc.uf}
				</Text>
				<Text style={css.incidentProperty}>
					Caso:
				</Text>
				<Text style={css.incidentValue}>
					{inc.title}
				</Text>
				<Text style={css.incidentProperty}>
					Descrição:
				</Text>
				<Text style={css.incidentValue}>
					{inc.description}
				</Text>
				
				<Text style={css.incidentProperty}>
					VALOR:
				</Text>
				<Text style={css.incidentValue}>
					{Intl.NumberFormat('pt-BR', {style: 'currency', currency : 'BRL' }).format(inc.value)}
				</Text>
			</View>

			<View style={css.contactBox}>
				<Text style={css.heroTitle}>
					Salve o dia!
				</Text>
				<Text style={css.heroTitle}>
					Seja o herói deste caso.
				</Text>
				<Text style={css.heroDescription}> Entre em contato :</Text>
				<View style={css.actions}>
					<TouchableOpacity 
						style={css.action} 
						onPress={sendWhats}
					>
						<Text style={css.actionText}> WhatsApp</Text>
					</TouchableOpacity>
					<TouchableOpacity 
						style={css.action} 
						onPress={sendMail}
					>
						<Text style={css.actionText}> E-mail </Text>
					</TouchableOpacity>
				</View>
					
			</View>


	
		</View>
	)  
}