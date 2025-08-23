import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Users, Phone, ExternalLink, BookOpen, BarChart2, Trash2 } from 'lucide-react-native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React, { useState, useCallback } from 'react';
import { getMetrics, resetMetrics, LocalMetrics, initialMetrics } from '@/utils/localMetrics';
import { useFocusEffect } from 'expo-router';

export default function AboutScreen() {
  const [metrics, setMetrics] = useState<LocalMetrics | null>(null);

  // Helper to reload metrics from storage
  const reloadMetrics = useCallback(async () => {
    const loadedMetrics = await getMetrics();
    setMetrics(loadedMetrics);
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Always return a cleanup or nothing for useFocusEffect
      reloadMetrics();
    }, [reloadMetrics])
  );

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const handleResetMetrics = async () => {
    try {
      await resetMetrics();
      await reloadMetrics();
    } catch (error) {
      console.error('Error resetting metrics:', error);
    }
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
          <View style={styles.sectionTitleContainer}>
            <BarChart2 size={20} color="#A78BFA" />
            <Text style={styles.sectionTitle}>Statistici Personale</Text>
          </View>
          {metrics ? (
            <View style={styles.metricsContainer}>
              <Text style={styles.metricItem}>Jocuri Începute: {metrics.playthroughsStarted}</Text>
              <Text style={styles.metricItem}>Jocuri Terminate: {metrics.playthroughsCompleted}</Text>
              <Text style={styles.metricItem}>Finaluri Pozitive: {metrics.endings.positive}</Text>
              <Text style={styles.metricItem}>Finaluri Neutre: {metrics.endings.neutral}</Text>
              <Text style={styles.metricItem}>Finaluri Negative: {metrics.endings.negative}</Text>
              <Text style={styles.metricItem}>Personaj Masculin Ales: {metrics.characterSelections?.male || 0}</Text>
              <Text style={styles.metricItem}>Personaj Feminin Ales: {metrics.characterSelections?.female || 0}</Text>
              <TouchableOpacity style={styles.resetMetricsButton} onPress={handleResetMetrics}>
                <Trash2 size={16} color="#EF4444" />
                <Text style={styles.resetMetricsText}>Resetează Statisticile</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.text}>Se încarcă statisticile...</Text>
          )}
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
          <View style={styles.helpTitleContainer}>
            <Phone size={20} color="#10B981" />
            <Text style={styles.helpTitle}>Linii de Ajutor</Text>
          </View>
          
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
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  helpTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
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
  metricsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
  },
  metricItem: {
    color: '#CBD5E1',
    fontSize: 15,
    marginBottom: 8,
  },
  resetMetricsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
  },
  resetMetricsText: {
    color: '#EF4444',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
