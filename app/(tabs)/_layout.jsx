import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

import home from '../../assets/icons/home.png';
import home_focused from '../../assets/icons/home-focused.png';

import control_focused from '../../assets/icons/controls-focused.png';
import controls from '../../assets/icons/controls.png';

import readings_focused from '../../assets/icons/readings-focused.png';
import readings from '../../assets/icons/readings.png';

import profile_focused from '../../assets/icons/profile-focused.png';
import profile from '../../assets/icons/profile.png';

import ai from '../../assets/icons/ai.png';

const TabIcon = ({ icon, color, name, focused, iconStyle }) => {
    return (
        <View style={styles.tabBar}>
            <Image
                style={[{ width: 24, height: 24 }, iconStyle]}
                source={icon}
                resizeMode="contain"
                tintColor={color}
            />
            <Text style={[styles.tabBarText, { color }]}>{name}</Text>
        </View>
    );
};

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: styles.barStyle,
                    tabBarActiveTintColor: '#007AFF',
                    tabBarInactiveTintColor: '#7E7E7E',
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        headerShown: false,
                        title: 'Home',
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon name="Home" color={color} icon={focused ? home_focused : home} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="controls"
                    options={{
                        headerShown: false,
                        title: 'Controls',
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                name="Controls"
                                color={color}
                                icon={focused ? control_focused : controls}
                            />
                        ),
                    }}
                />

                {/* Center AI button with cutout */}
                <Tabs.Screen
                    name="(farm-ai)"
                    options={{
                        headerShown: false,
                        title: '',
                        tabBarIcon: ({ color, focused }) => (
                            <View style={styles.aiButtonContainer}>
                                <View>
                                    <Image
                                        style={[styles.ai_tbn, ]}
                                        source={ai}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                        ),
                    }}
                />

                <Tabs.Screen
                    name="readings"
                    options={{
                        headerShown: false,
                        title: 'Readings',
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                name="Readings"
                                icon={focused ? readings_focused : readings}
                                color={color}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="profile"
                    options={{
                        headerShown: false,
                        title: 'Profile',
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                name="Profile"
                                color={color}
                                icon={focused ? profile_focused : profile}
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabsLayout;

export const styles = StyleSheet.create({
    tabBar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarText: {
        fontSize: 12,
        fontWeight: '500',
    },
    barStyle: {
        height: 72,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA',
        paddingTop: 5,
        paddingBottom: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    aiButtonContainer: {
        position: 'absolute',
        bottom: 10, // To lift the button above the rest of the tab bar
        width: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#fefefe',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 5,
        elevation: 5, // For Android elevation
    },
    aiButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ai_tbn: {
        width: 72,
        height: 72,
    },
});
