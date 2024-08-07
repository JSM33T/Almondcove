using Almondcove.Entities.Dedicated;
using FluentValidation;

namespace Almondcove.Validators
{
    public class MessageRequestValidator : AbstractValidator<MessageRequest>
    {
        public MessageRequestValidator()
        {
            RuleFor(x => x.Origin)
               .NotEmpty().WithMessage("Name is required")
               .MaximumLength(128).WithMessage("Name cannot exceed 128 characters");

            //RuleFor(x => x.Mail)
            //    .NotEmpty().WithMessage("Email is required")
            //    .EmailAddress().WithMessage("Invalid email format")
            //    .MaximumLength(128).WithMessage("Email cannot exceed 128 characters");

            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Message is required")
                .MinimumLength(3).WithMessage("Message must be at least 3 characters long")
                .MaximumLength(512).WithMessage("Message cannot exceed 512 characters");

            RuleFor(x => x.Topic)
                .NotEmpty().WithMessage("Topic is required")
                .MaximumLength(128).WithMessage("Topic cannot exceed 128 characters");
        }
    }
}
