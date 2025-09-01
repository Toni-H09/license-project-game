import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Heart, Users, Trophy } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function HomeScreen() {
  const startNewGame = () => {
    console.log('Starting new game');
    router.push('/game');
  };

  return (
    <LinearGradient
      colors={['#1E293B', '#334155']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Trăiește viața în scaun cu rotile</Text>
          <Text style={styles.subtitle}>
            O experiență interactivă care explorează provocările și triumfurile vieții cu dizabilități
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Heart size={32} color="#10B981" />
            <Text style={styles.featureTitle}>Starea Personală</Text>
            <Text style={styles.featureText}>
              Urmărește-ți încrederea, speranța și starea emoțională
            </Text>
          </View>

          <View style={styles.feature}>
            <Users size={32} color="#3B82F6" />
            <Text style={styles.featureTitle}>Relații Sociale</Text>
            <Text style={styles.featureText}>
              Construiește conexiuni și navighează relațiile interpersonale
            </Text>
          </View>

          <View style={styles.feature}>
            <Trophy size={32} color="#F59E0B" />
            <Text style={styles.featureTitle}>Finaluri Multiple</Text>
            <Text style={styles.featureText}>
              Alegerile tale determină rezultatul poveștii tale
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.startButton}
          onPress={startNewGame}
        >
          <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Începe Jocul</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Informații Lucrare de Licență</Text>
          <Text style={styles.helpText}>
            • Autor: Hădade Antonio - Mihai
            {'\n'}• Titlu: Gamified storytelling for community engagement
            {'\n'}• Coordonator: Sl.dr.ing. Aurelia CIUPE
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 24,
  },
  warning: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  features: {
    marginBottom: 32,
  },
  feature: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 20,
  },
  startButton: {
    marginBottom: 32,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  helpSection: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#E5E7EB',
    lineHeight: 20,
  },
});
