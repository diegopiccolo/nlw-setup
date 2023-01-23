import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import { api } from '../lib/axios';

const availAbleWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function New() {

  const [title, setTitle] = useState('');

  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDays(weekdayIndex: number) {
    if (weekDays.includes(weekdayIndex)) {
      setWeekDays(prevState => prevState.filter(weekday => weekday !== weekdayIndex));
    } else {
      setWeekDays(prevState => [...prevState, weekdayIndex]);
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert('Novo Hábito', 'Informe um titulo e escolha a periodicidade');
      }
      await api.post('/habits', {title, weekDays});
      setTitle('');
      setWeekDays([]);

      Alert.alert('Novo Hábito', 'Hábito criado com sucesso');

    } catch (error) {
      console.log(error);
      Alert.alert('Ops!', 'Não foi possivel criar o novo hábito');
    } 
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>
        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg bg-zinc-900 border-zinc-800 mt-3
          text-white border-2 focus:border-x-green-600"
          placeholder='Exercícios, Dormir Bem, Etc'
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}

        />
        <Text className="font-semibold text-base text-white mt-4 mb-3">
          Qual a recorrência
        </Text>
        {
          availAbleWeekDays.map((weekday, i) => (
            <Checkbox
              key={weekday}
              title={weekday}
              checked={weekDays.includes(i)}
              onPress={() => handleToggleWeekDays(i)}
            />
          ))

        }
        <TouchableOpacity
          activeOpacity={0.7}
          className='w-full h-14 flex-row items-center justify-center  bg-green-500 rounded-md mt-6'
          onPress={handleCreateNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />

          <Text className='font-semibold text-base text-white ml-2'>
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}