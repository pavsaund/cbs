// using System;
// using Dolittle.Events;

// namespace Events.StaffUser
// {
//     public class PhoneNumberAddedToSystemConfigurator : IEvent
//     {
//         public Guid StaffUserId { get; set; }
//         public string PhoneNumber { get; set; }

//         public PhoneNumberAddedToSystemConfigurator(Guid staffUserId, string phoneNumber)
//         {
//             StaffUserId = staffUserId;
//             PhoneNumber = phoneNumber;
//         }
//     }

//     public class PhoneNumberAddedToDataCoordinator : IEvent
//     {
//         public Guid StaffUserId { get; set; }
//         public string PhoneNumber { get; set; }

//         public PhoneNumberAddedToDataCoordinator(Guid staffUserId, string phoneNumber)
//         {
//             StaffUserId = staffUserId;
//             PhoneNumber = phoneNumber;
//         }
//     }

//     public class PhoneNumberAddedToDataOwner : IEvent
//     {
//         public Guid StaffUserId { get; set; }
//         public string PhoneNumber { get; set; }

//         public PhoneNumberAddedToDataOwner(Guid staffUserId, string phoneNumber)
//         {
//             StaffUserId = staffUserId;
//             PhoneNumber = phoneNumber;
//         }
//     }

//     public class PhoneNumberAddedToDataVerifier : IEvent
//     {
//         public Guid StaffUserId { get; set; }
//         public string PhoneNumber { get; set; }

//         public PhoneNumberAddedToDataVerifier(Guid staffUserId, string phoneNumber)
//         {
//             StaffUserId = staffUserId;
//             PhoneNumber = phoneNumber;
//         }
//     }
// }