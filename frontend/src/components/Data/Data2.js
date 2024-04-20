import { useEffect, useState } from 'react';
import { collection, getDoc, doc , query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
    UilMoneyWithdrawal,
    UilUsdSquare
} from "@iconscout/react-unicons";

const Role_of_person = () => {
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const auth = getAuth();
    const navigate = useNavigate();
    const [data,setdata] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUserId(uid); // Set userId using setUserId
            } else {
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, [auth, navigate]);

    useEffect(() => {
        if (userId) {
            getUserRole(userId);
        }
    }
    , [userId]);

    const getUserRole = async (userId) => {
        try {
            // const usersSnapshot = await getDocs(collection(db, "Users"));
            const userRef = doc(db, "Users", userId); // Fetch the document snapshot for the specific user
            const userSnapshot = await getDoc(userRef);
            setdata(userSnapshot.data())
            setUserRole(userSnapshot.data().Role)
        } catch (error) {
            console.error("Error fetching user role:", error);
        }
    }

    // Sidebar Data based on user role
    let sidebarData;
    if (userRole === 'Admin') {
        sidebarData = [
            {
                icon: UilEstate,
                path: "/OTP/Dashboard",
                heading: "Home",
            },
            {
                icon: UilChart,
                path: "/OTP/Dashboard/Non_assign_Complaints",
                heading: 'Non-Assigned Complaints'
            },
            {
                icon: UilChart,
                path: "/OTP/Dashboard/Assigned_Complaints",
                heading: 'Assigned Complaints'
            },
        ];
    } else if (userRole === 'Employee') {
        sidebarData = [
            {
                icon: UilEstate,
                path: "/OTP/Dashboard",
                heading: "Home",
            },
            {
                icon: UilClipboardAlt,
                path: "/OTP/Dashboard/complaint_status",
                heading: "Complaints-status",
            },
            {
                icon: UilUsersAlt,
                path: "/OTP/Dashboard/ano_non_anony",
                heading: "Raise Complaint",
            },
            {
                icon: UilPackage,
                path: "/OTP/Dashboard/AllComplaints",
                heading: 'All-Complaints'
            },
            {
                icon: UilChart,
                path: "/OTP/Dashboard/Choose_message_system/Message_raised",
                heading: 'Messaging'
            },
        ];
    }   
    else if (userRole === 'HOD'){
        sidebarData = [
            {
                icon: UilEstate,
                path: "/OTP/Dashboard",
                heading: "Home",
            },
            {
                icon: UilClipboardAlt,
                path: "/OTP/Dashboard/complaint_status",
                heading: "Complaints-status",
            },
            {
                icon: UilUsersAlt,
                path: "/OTP/Dashboard/ano_non_anony",
                heading: "Raise Complaint",
            },
            {
                icon: UilPackage,
                path: "/OTP/Dashboard/AllComplaints",
                heading: 'All-Complaints'
            },
            {
                icon: UilChart,
                path: "/OTP/Dashboard/Assigned_Complaints",
                heading: 'Assigned Complaints'
            },
            {
                icon: UilChart,
                path: "/OTP/Dashboard/Choose_message_system",
                heading: 'Messaging'
            },
        ];
    }


    console.log("aasssaaa");
    console.log('UserId:', userId);
    console.log('UserRole:', userRole);
    console.log('SidebarData:', sidebarData);
    console.log("asssaaaaa");
    // Return SidebarData
    return userRole;
};

export default Role_of_person;
