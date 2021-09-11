import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/customButtons/CustomButton";
import NetInfo from "@react-native-community/netinfo";

const LogIn = (props) => {
	const { navigation } = props;
	const [isOffline, setOfflineStatus] = useState(false);
	const getData = async () => {
		try {
			const res = await AsyncStorage.getItem("restorePath");
			const parRes = JSON.parse(res);
			return parRes;
		} catch (err) {
			console.log(err);
		}
	};
	//TODO - restore the user path using the async call and the array of the path
	const logInHandler = () => {
		navigation.navigate("farms");
		// getData()
		// 	.then((succ) => {
		// 		if (succ) {
		// 			console.log(succ);

		// 		} else {
		// 			navigation.navigate("farms");
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	};
	useEffect(() => {
		const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
			const offline = !(state.isConnected && state.isInternetReachable);
			setOfflineStatus(offline);
		});
		return () => removeNetInfoSubscription();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			{isOffline ? (
				<View style={styles.notFoundContainer}>
					<Ionicons
						name='leaf'
						size={80}
						style={styles.image}
						color={Colors.primary}
					/>
					<Text style={styles.notFoundText}>
						Internet connection was not found.
					</Text>
					<Text style={styles.notFoundText}>Please turn it on :)</Text>
				</View>
			) : (
				<>
					<View style={styles.imageContainer}>
						<Ionicons name='leaf' size={70} style={styles.image} />
					</View>
					<View style={styles.textContainers}>
						<View style={styles.inpuContainer}>
							<Text style={styles.text}>Username</Text>
							<TextInput style={styles.input}></TextInput>
						</View>
						<View style={styles.inpuContainer}>
							<Text style={styles.text}>Password</Text>
							<TextInput
								secureTextEntry={true}
								style={styles.input}
							></TextInput>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<CustomButton
							title='Log In'
							pressHandler={logInHandler}
							customStyle={{ width: "150%" }}
						/>
					</View>
				</>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	imageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",

		width: "100%",
	},
	image: {
		color: Colors.primary,
	},
	text: {
		marginVertical: 5,
		color: Colors.textColor,
		fontSize: 20,
	},
	textContainers: {
		flex: 2,
		justifyContent: "flex-start",
		alignItems: "center",

		width: "100%",
	},
	buttonContainer: {
		position: "absolute",
		bottom: 0,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	inpuContainer: {
		justifyContent: "center",
		alignItems: "flex-start",
	},
	input: {
		borderColor: Colors.secondary,
		borderWidth: 2,
		borderRadius: 5,
		width: 250,
		height: 40,
		padding: 2,
		paddingStart: 8,
		fontSize: 20,
		marginVertical: 20,
	},
	notFoundContainer: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		width: "90%",
		marginTop: 50,
	},
	notFoundText: {
		color: Colors.textColor,
		fontSize: 24,
		textAlign: "center",
	},
});

export default LogIn;
