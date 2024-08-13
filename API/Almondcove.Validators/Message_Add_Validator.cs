using Almondcove.Entities.DTO;
using FluentValidation;

namespace Almondcove.Validators
{
    public class MessageRequestValidator : AbstractValidator<Message_AddRequest>
    {
        public MessageRequestValidator()
        {
            RuleFor(x => x.Name)
               .NotEmpty().WithMessage("Name is required")
               .MaximumLength(128).WithMessage("Name is too long");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Invalid email format")
                .MaximumLength(256).WithMessage("Email too long");

            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("CONTACT.VALIDATION.MESSAGE_REQUIRED")
                .MinimumLength(5).WithMessage("CONTACT.VALIDATION.SHORT_MESSAGE")
                .MaximumLength(512).WithMessage("CONTACT.VALIDATION.LONG_MESSAGE");

            RuleFor(x => x.Topic)
                .NotEmpty().WithMessage("CONTACT.VALIDATION.TOPIC_REQUIRED")
                .MaximumLength(128).WithMessage("CONTACT.VALIDATION.LONG_TOPIC");
        }
    }
}
