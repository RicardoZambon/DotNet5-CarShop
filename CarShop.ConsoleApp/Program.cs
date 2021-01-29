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
                Console.WriteLine($"2) Agendamento de test-drive");
                Console.WriteLine($"3) Revisão e manutenção");
                Console.WriteLine($"4) Sair");
                Console.WriteLine();

                int opcao = Convert.ToInt32(Console.ReadLine());

                if (opcao == 1)
                {
                    Console.WriteLine("Carregando modelos disponíveis... Um instante.");
                }
                else if (opcao == 2)
                {
                    Console.WriteLine("Carregando agenda, por favor, aguarde.");
                }
                else if (opcao == 3)
                {
                    Console.WriteLine("Checando disponibilidade da oficina, aguarde.");
                }
                else if (opcao == 4)
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
