using System;
using System.Collections.Generic;

namespace CarShop.Core.Helper
{
    public class QueryParameters
    {
        public IDictionary<string, string> Sort { get; set; }

        public IDictionary<string, object> Filters { get; set; }
    }
}