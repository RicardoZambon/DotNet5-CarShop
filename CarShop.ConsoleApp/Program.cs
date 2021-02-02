using System;

namespace CarShop.ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            bool opcaoInvalida = false;

            do
            {
                Console.WriteLine("############################################");
                Console.WriteLine("##              CarShop                   ##");
                Console.WriteLine("############################################");
                Console.WriteLine("");

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
                    Console.WriteLine("Carregando modelos disponíveis... Um instante.");
                    Console.WriteLine();

                    Console.WriteLine("Por favor, informe modelos em que possui interesse:");

                    string[] modelos = new string[99_999_999];
                    for (int i = 0; i < modelos.Length; i++)
                    {
                        modelos[i] = Console.ReadLine();

                        Console.WriteLine("Há mais modelos que gostaria de informar? (S/N)");
                        string resposta = Console.ReadLine();
                        if (resposta == "S")
                        {
                            //TODO: Ajustar array, guardar última posição
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
                        Console.WriteLine($"1º modelo: {modelos[i]}");
                    }
                }

                else if (opcao == 3)
                {
                    Console.WriteLine("Carregando agenda, por favor, aguarde.");
                }
                else if (opcao == 4)
                {
                    Console.WriteLine("Checando disponibilidade da oficina, aguarde.");
                }
                else if (opcao == 5)
                {
                    Console.WriteLine("Foi um prazer atendê-lo, volte sempre!");
                }
                else
                {
                    opcaoInvalida = true;
                }

            } while (opcaoInvalida);
        }
    }
}
