using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CarShop.Core.Helper.ExtensionMethods
{
    public static class TypeExtension
    {
        public static bool ImplementsGenericInterface(this Type type, Type iInterface)
        {
            return type.GetInterface(iInterface.Name) != null || iInterface.IsGenericType && type.GetInterfaces().Any(x => x.Name == iInterface.Name);
        }

        public static Type GetGenericInterfaceType(this Type type, Type iInterface)
        {
            return type.GetInterfaces().FirstOrDefault(x => x.Name == iInterface.Name).GenericTypeArguments[0];
        }
    }
}