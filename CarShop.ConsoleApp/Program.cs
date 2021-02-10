using System;
using System.Collections.Generic;

namespace CarShop.ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            bool opcaoInvalida = false;

            do
            {
                EscreverCabecalho();

                Console.Write("Bem vindo! Qual o seu nome? ");
                string nome = Console.ReadLine();

                Console.WriteLine($"Olá, {nome}! O que gostaria de fazer?");
                Console.WriteLine();

                Console.WriteLine($"1) Consultar modelos disponíveis");
                Console.WriteLine($"2) Consultar fabricantes");
                Console.WriteLine($"3) Agendamento de test-drive");
                Console.WriteLine($"4) Revisão e manutenção");
                Console.WriteLine($"5) Sair");
                Console.WriteLine();

                int opcao = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine();

                if (opcao == 1)
                {
                    //Opcao1_ComArray();
                    Opcao1_ComList();
                }
                else if (opcao == 2)
                {
                    //Console.Clear();
                    EscreverCabecalho();
                    
                    Console.WriteLine("Carregando fabricantes... Um instante.");
                }
                else if (opcao == 4)
                {

                }
                else if (opcao == 5)
                {

                }
                else
                {
                    opcaoInvalida = true;
                }

            } while (opcaoInvalida);
        }

        static void EscreverCabecalho()
        {
            Console.Clear();
            Console.WriteLine("############################################");
            Console.WriteLine("##      CarShop - Os melhores carros!     ##");
            Console.WriteLine("############################################");
            Console.WriteLine("");
        }

        static void Opcao1_ComArray()
        {
            EscreverCabecalho();

            Console.WriteLine("Carregando modelos disponíveis... Um instante.");
            Console.WriteLine();

            Console.WriteLine("Por favor, informe modelos em que possui interesse:");

            //int ultimaPosicao = 1;
            string[] modelos = new string[1];
            for (int i = 0; i < modelos.Length; i++)
            {
                modelos[i] = Console.ReadLine();

                Console.WriteLine("Há mais modelos que gostaria de informar? (S/N)");
                string resposta = Console.ReadLine();
                if (resposta == "S")
                {
                    //TODO: Ajustar array, guardar última posição

                    //ultimaPosicao++;
                    Array.Resize(ref modelos, modelos.Length + 1);
                }
                else //N
                {
                    //Sair do for
                    break;
                }
            }
            Console.WriteLine();

            Console.WriteLine("Ótimo! Você informou os seguintes modelos: ");
            for (int i = 0; i < modelos.Length; i++)
            {
                Console.WriteLine($"{i + 1}º modelo: {modelos[i]}");
            }
        }

        static void Opcao1_ComList()
        {
            EscreverCabecalho();

            Console.WriteLine("OPCAO COM LIST");
            Console.WriteLine("Carregando modelos disponíveis... Um instante.");
            Console.WriteLine();

            Console.WriteLine("Por favor, informe modelos em que possui interesse:");

            List<string> modelosList = new List<string>();
            
            string resposta;
            do
            {
                modelosList.Add(Console.ReadLine());

                Console.WriteLine("Há mais modelos que gostaria de informar? (S/N)");
                resposta = Console.ReadLine();

            } while (resposta == "S");
            Console.WriteLine();

            Console.WriteLine("Ótimo! Você informou os seguintes modelos: ");
            for (int i = 0; i < modelosList.Count; i++)
            {
                Console.WriteLine($"{i + 1}º modelo: {modelosList[i]}");
            }
        }
    }
}