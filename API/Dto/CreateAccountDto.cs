using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class CreateAccountDto
    {
        //This is the same as loginDto but we may give it more
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
