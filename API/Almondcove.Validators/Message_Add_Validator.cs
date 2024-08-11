using Almondcove.Entities.Dedicated;
using FluentValidation;

namespace Almondcove.Validators
{
    public class MessageRequestValidator : AbstractValidator<MessageRequest>
    {
        public MessageRequestValidator()
        {
            RuleFor(x => x.Name)
               .NotEmpty().WithMessage("CONTACT.VALIDATION.NAME_REQUIRED")
               .MaximumLength(128).WithMessage("CONTACT.VALIDATION.LONG_NAME");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("CONTACT.VALIDATION.EMAIL_REQUIRED")
                .EmailAddress().WithMessage("CONTACT.VALIDATION.EMAIL_INVALID")
                .MaximumLength(128).WithMessage("CONTACT.VALIDATION.EMAIL_INVALID");

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
