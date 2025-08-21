import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Users, Phone, ExternalLink, BookOpen } from 'lucide-react-native';

export default function AboutScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <LinearGradient
      colors={['#1E293B', '#334155']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Despre Joc</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scopul Jocului</Text>
          <Text style={styles.text}>
            Acest joc interactiv are ca scop creșterea conștientizării asupra provocărilor 
            cu care se confruntă persoanele cu dizabilități în viața de zi cu zi. 
            Prin experiența narativă, jucătorii pot dezvolta empatie și înțelegere 
            față de aceste experiențe.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cum să Joci</Text>
          <View style={styles.instruction}>
            <BookOpen size={20} color="#3B82F6" />
            <Text style={styles.instructionText}>
              Citește cu atenție fiecare situație prezentată
            </Text>
          </View>
          <View style={styles.instruction}>
            <Heart size={20} color="#10B981" />
            <Text style={styles.instructionText}>
              Alege opțiunea care ți se pare cea mai potrivită
            </Text>
          </View>
          <View style={styles.instruction}>
            <Users size={20} color="#F59E0B" />
            <Text style={styles.instructionText}>
              Urmărește cum evoluează barele de progres
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conținut Sensibil</Text>
          <Text style={styles.warningText}>
            Acest joc abordează teme serioase legate de sănătatea mentală, 
            izolarea socială și provocările dizabilității. Dacă te simți 
            afectat de conținut, te rugăm să iei o pauză și să contactezi 
            o sursă de sprijin.
          </Text>
        </View>

        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>
            <Phone size={20} color="#10B981" /> Linii de Ajutor
          </Text>
          
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => openLink('tel:116123')}
          >
            <Text style={styles.helpButtonText}>Telefonul de Suflet: 116 123</Text>
            <ExternalLink size={16} color="#10B981" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => openLink('https://www.who.int/health-topics/disability')}
          >
            <Text style={styles.helpButtonText}>Resurse WHO pentru Dizabilități</Text>
            <ExternalLink size={16} color="#10B981" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => openLink('https://www.ims.ro')}
          >
            <Text style={styles.helpButtonText}>Institutul Marius Nasta</Text>
            <ExternalLink size={16} color="#10B981" />
          </TouchableOpacity>
        </View>

        <View style={styles.credits}>
          <Text style={styles.creditsTitle}>Credite</Text>
          <Text style={styles.creditsText}>
            Acest joc a fost creat cu scopul de a promova incluziunea și înțelegerea. 
            Mulțumim tuturor persoanelor care au contribuit cu experiențele lor 
            pentru a face acest proiect posibil.
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
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#E5E7EB',
    lineHeight: 24,
  },
  warningText: {
    fontSize: 16,
    color: '#FEF3C7',
    lineHeight: 24,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#E5E7EB',
    marginLeft: 12,
    flex: 1,
  },
  helpSection: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 16,
    textAlign: 'center',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  helpButtonText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  credits: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 16,
  },
  creditsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  creditsText: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
    textAlign: 'center',
  },
});