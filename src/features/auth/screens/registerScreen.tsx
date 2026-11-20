import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { AuthHeaderLayout } from '../components/authHeader';

interface RegisterScreenProps {
  onBackToSignIn?: () => void;
  onContactDesk?: () => void;
}

// choces
const INSTITUTES = ['Institute of Computing Studies'];
const PROGRAMS = ['BS Secondary Education', 'BS Business Administration', 'BS Information Technology', 'BS Computer Engineering'];
const YEAR_LEVELS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export function RegisterScreen({
  onBackToSignIn,
  onContactDesk,
}: RegisterScreenProps) {
    
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // ---------STEP 1----------
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  // ---------STEP 2----------
  const [studentNo, setStudentNo] = useState('');
  const [institute, setInstitute] = useState('');
  const [program, setProgram] = useState('');
  const [yearLevel, setYearLevel] = useState('');

  const [activeDropdown, setActiveDropdown] = useState<'institute' | 'program' | 'year' | null>(null);

   // ---------STEP 3----------
  const [studentIdFile, setStudentIdFile] = useState<string | null>(null);
  const [ovrfFile, setOvrfFile] = useState<string | null>(null);
  const [selfieWithIdFile, setSelfieWithIdFile] = useState<string | null>(null);

  const handleBack = () => {
    if (step === 1) {
      onBackToSignIn?.(); 
    } else if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep(4);
  };

  const getDropdownOptions = () => {
    if (activeDropdown === 'institute') return INSTITUTES;
    if (activeDropdown === 'program') return PROGRAMS;
    if (activeDropdown === 'year') return YEAR_LEVELS;
    return [];
  };

  const handleSelectOption = (value: string) => {
    if (activeDropdown === 'institute') setInstitute(value);
    if (activeDropdown === 'program') setProgram(value);
    if (activeDropdown === 'year') setYearLevel(value);
    setActiveDropdown(null); 
  };

  return (
    <AuthHeaderLayout>
      <View className="flex-1">

        <View className="w-10 h-1 bg-[#D6D1C7] rounded-full self-center -mt-3 mb-4" />

        {/* ==========================STEP 1=============================== */}
        {step === 1 && (
          <Animated.View key="step1" entering={FadeIn.duration(300)} className="flex-1">
            <View className="items-center mb-8">
              <Text className="text-[26px] font-poppins-bold text-[#1E1C1A]">
                Registration
              </Text>
              <Text className="text-[12px] font-poppins-medium text-[#7A756D]">
                Personal Information
              </Text>
            </View>

            <View className="mt-6 gap-5">

              <View className="bg-[#E9E4DC] rounded-[12px] px-4 py-3.5">
                <TextInput
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Last Name"
                  placeholderTextColor="#8C867E"
                  textAlign="center"
                  className="text-sm text-[#1E1C1A]"
                />
              </View>

              <View className="bg-[#E9E4DC] rounded-[12px] px-4 py-3.5">
                <TextInput
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="First Name"
                  placeholderTextColor="#8C867E"
                  textAlign="center"
                  className="text-sm text-[#1E1C1A]"
                />
              </View>

              <View className="bg-[#E9E4DC] rounded-[12px] px-4 py-3.5">
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email Address"
                  placeholderTextColor="#8C867E"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  textAlign="center"
                  className="text-sm text-[#1E1C1A]"
                />
              </View>

            </View>

          </Animated.View>
        )}

        {/* ==========================STEP 2=============================== */}
        {step === 2 && (
          <Animated.View key="step2" entering={FadeIn.duration(300)} className="flex-1">

            <View className="items-center mb-8">
              <Text className="text-[26px] font-poppins-bold text-[#1E1C1A]">
                Registration
              </Text>
              <Text className="text-[12px] font-poppins-medium text-[#7A756D]">
                Student Information
              </Text>
            </View>

            <View className="mt-6 gap-6">
              
              <View className="bg-[#E9E4DC] rounded-[12px] px-4 py-3.5">
                <TextInput
                  value={studentNo}
                  onChangeText={setStudentNo}
                  placeholder="Student No."
                  placeholderTextColor="#8C867E"
                  textAlign="center"
                  className="text-sm text-[#1E1C1A]"
                />
              </View>

              
              <TouchableOpacity
                onPress={() => setActiveDropdown('institute')}
                activeOpacity={0.8}
                className="bg-[#E9E4DC] rounded-[12px] px-4 py-5 flex-row items-center justify-center relative">

                    <Text className={`text-sm ${institute ? 'text-[#1E1C1A]' : 'text-[#8C867E]'}`}>
                        {institute || 'Institute'}
                    </Text>
                    <Ionicons
                    name="chevron-down"
                    size={18}
                    color="#7A756D"
                    style={{ position: 'absolute', right: 16 }}/>

              </TouchableOpacity>

              
              <TouchableOpacity 
                onPress={() => setActiveDropdown('program')}
                activeOpacity={0.8}
                className="bg-[#E9E4DC] rounded-[12px] px-4 py-5 flex-row items-center justify-center relative"
              >
                <Text className={`text-sm ${program ? 'text-[#1E1C1A]' : 'text-[#8C867E]'}`}>
                  {program || 'Program'}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={18}
                  color="#7A756D"
                  style={{ position: 'absolute', right: 16 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveDropdown('year')}
                activeOpacity={0.8}
                className="bg-[#E9E4DC] rounded-[12px] px-4 py-5 flex-row items-center justify-center relative"
              >
                <Text className={`text-sm ${yearLevel ? 'text-[#1E1C1A]' : 'text-[#8C867E]'}`}>
                  {yearLevel || 'Year Level'}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={18}
                  color="#7A756D"
                  style={{ position: 'absolute', right: 16 }}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        {/* ==========================STEP 3=============================== */}
        {step === 3 && (
          <Animated.View key="step3" entering={FadeIn.duration(300)} className="flex-1">

            <View className="items-center mb-8">
              <Text className="text-[26px] font-poppins-bold text-[#1E1C1A]">
                Registration
              </Text>
              <Text className="text-[12px] font-poppins-medium text-[#7A756D]">
                Document Verification
              </Text>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 16, paddingBottom: 8 }}
            >
              <View className="bg-[#E2DFD9] rounded-[16px] py-8 px-4 flex-row items-center justify-between">
                <View className="flex-row items-center flex-1 pr-2">
                  <View className="w-9 h-9 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
                    <Ionicons name="id-card-outline" size={18} color="#1E1C1A" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[13px] font-poppins-bold text-[#1E1C1A]">
                      Upload Student ID
                    </Text>
                    <Text className="text-[10px] text-[#7A756D]">
                      Latest ID Card (Max 5MB)
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => setStudentIdFile('student_id.jpg')}
                  activeOpacity={0.8}
                  className="bg-[#FAF9F5] px-3 py-1.5 rounded-full flex-row items-center"
                >
                  <Ionicons
                    name={studentIdFile ? 'checkmark-circle' : 'add'}
                    size={14}
                    color="#4A3E20"
                  />
                  <Text className="text-[11px] font-poppins-semibold text-[#1E1C1A] ml-1">
                    {studentIdFile ? 'Uploaded' : 'Browse'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="bg-[#E2DFD9] rounded-[16px] py-8 px-4 flex-row items-center justify-between">
                <View className="flex-row items-center flex-1 pr-2">
                  <View className="w-9 h-9 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
                    <Ionicons name="camera-outline" size={18} color="#1E1C1A" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[13px] font-poppins-bold text-[#1E1C1A]">
                      Selfie with Student ID
                    </Text>
                    <Text className="text-[10px] text-[#7A756D]">
                      Clear photo holding your ID
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => setSelfieWithIdFile('selfie_id.jpg')}
                  activeOpacity={0.8}
                  className="bg-[#FAF9F5] px-3 py-1.5 rounded-full flex-row items-center"
                >
                  <Ionicons
                    name={selfieWithIdFile ? 'checkmark-circle' : 'add'}
                    size={14}
                    color="#4A3E20"
                  />
                  <Text className="text-[12px] font-poppins-semibold text-[#1E1C1A] ml-1">
                    {selfieWithIdFile ? 'Uploaded' : 'Snap'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="bg-[#E2DFD9] rounded-[16px] py-8 px-4 flex-row items-center justify-between">
                <View className="flex-row items-center flex-1 pr-2">
                  <View className="w-9 h-9 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
                    <Ionicons name="document-text-outline" size={18} color="#1E1C1A" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[13px] font-poppins-bold text-[#1E1C1A]">
                      Upload OVRF
                    </Text>
                    <Text className="text-[10px] text-[#7A756D]">
                      Certificate of Registration
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => setOvrfFile('ovrf_2026.pdf')}
                  activeOpacity={0.8}
                  className="bg-[#FAF9F5] px-3 py-1.5 rounded-full flex-row items-center"
                >
                  <Ionicons
                    name={ovrfFile ? 'checkmark-circle' : 'add'}
                    size={14}
                    color="#4A3E20"
                  />
                  <Text className="text-[12px] font-poppins-semibold text-[#1E1C1A] ml-1">
                    {ovrfFile ? 'Uploaded' : 'Attach'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

          </Animated.View>
        )}

        {/* ==========================CMPLETE=============================== */}     

        {step === 4 && (
          <Animated.View key="step4" entering={FadeIn.duration(350)} className="flex-1 items-center pt-4">

            <View className="w-16 h-16 rounded-full border-2 border-[#4A3E20] items-center justify-center mb-4">
              <Ionicons name="checkmark" size={34} color="#4A3E20" />
            </View>

            <Text className="text-[24px] font-poppins-bold text-[#1E1C1A] text-center leading-8">
              Registration{'\n'}Complete
            </Text>

            <Text className="text-xs text-[#7A756D] text-center mt-2.5 px-4 leading-5">
              Wait for the approval of your registration. We will contact you through your proivded email.
            </Text>

            <View className="flex-row items-center bg-[#EFECE6] px-5 py-2.5 rounded-full mt-5">
              <View className="w-2 h-2 rounded-full bg-[#4A3E20] mr-2" />
              <Text className="text-[12px] font-poppins-medium text-[#3B3732]">
                Status: Under Admin Review
              </Text>
            </View>

            <TouchableOpacity
              onPress={onBackToSignIn}
              activeOpacity={0.85}
              className="w-full bg-[#4A3E20] rounded-full py-3.5 items-center mt-auto"
            >
              <Text className="text-white text-[13px] font-poppins-semibold">
                Return
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center mt-3">
              <Text className="text-[11px] text-[#7A756D]">Need help? </Text>
              <TouchableOpacity onPress={onContactDesk}>
                <Text className="text-[11px] font-poppins-semibold text-[#4A3E20] underline">
                  Contact Support
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        {/* ==========================BOTTOM NAV=============================== */}
        {step < 4 && (
            <View className="flex-row items-center justify-between mt-auto pt-4">

                <TouchableOpacity // BACK BUTTON
                    onPress={handleBack}
                    activeOpacity={0.8}
                    className="w-12 h-12 rounded-full bg-[#D8C77A] items-center justify-center">
                    <Ionicons name="chevron-back" size={22} color="#1E1C1A" />
                </TouchableOpacity>

                
                <View className="flex-row items-center gap-1.5">
                    {[1, 2, 3].map((dotNumber) => ( // 3DOTS

                    <View
                        key={dotNumber}
                        className={`h-1.5 rounded-full ${
                            step === dotNumber
                            ? 'w-6 bg-[#4A3E20]'
                            : 'w-1.5 bg-[#D6D1C7]'
                        }`}
                    />
                    ))}
                </View>

                <TouchableOpacity // NEXT BUTTON
                    onPress={handleNext}
                    activeOpacity={0.85}
                    className="w-12 h-12 rounded-full bg-[#4A3E20] items-center justify-center"
                    >
                    <Ionicons
                        name={step === 3 ? 'checkmark' : 'chevron-forward'}
                        size={22}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>

            </View>
        )}

      </View>

      {/* =========================DROPDOWN================================= */}
      <Modal
        visible={activeDropdown !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveDropdown(null)}>

            <Pressable
                onPress={() => setActiveDropdown(null)}
                className="flex-1 bg-black/40 justify-center px-8">

                <View className="bg-[#FAF9F5] rounded-2xl p-4 shadow-lg">
                    <Text className="text-sm font-poppins-bold text-[#1E1C1A] mb-2 text-center">
                    Select an Option
                    </Text>
                    <ScrollView className="max-h-60">
                        {getDropdownOptions().map((option) => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => handleSelectOption(option)}
                                className="py-3 border-b border-[#E9E4DC]">

                                <Text className="text-sm text-[#1E1C1A] text-center">
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Pressable>

      </Modal>
    </AuthHeaderLayout>
  );
}