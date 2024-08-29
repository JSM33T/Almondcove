using Almondcove.Entities.DTO;
using FluentValidation;

namespace Almondcove.Validators
{
    public class User_SignupRequestValidator : AbstractValidator<User_SignupRequest>
    {
        public User_SignupRequestValidator()
        {
            RuleFor(x => x.Username)
               .NotEmpty().WithMessage("Username is required")
               .MaximumLength(128).WithMessage("Username too long")
               .MinimumLength(4).WithMessage("username should be atlease 4 characters long");

            RuleFor(x => x.Firstname)
               .NotEmpty().WithMessage("Firstname is required")
               .MaximumLength(128).WithMessage("Username too long");

            RuleFor(x => x.Email)
               .NotEmpty().WithMessage("Email is required")
               .MaximumLength(128).WithMessage("Username too long");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required")
                .EmailAddress().WithMessage("Invalid email format")
                .MaximumLength(256).WithMessage("Email too long");
        }
    }
}
