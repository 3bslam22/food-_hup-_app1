export interface MenuItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description?: string;
  rating?: number;
  ratingCount?: number;
  isAvailable?: boolean;
}

export interface Offer {
  id: string;
  restaurantId: string;
  title: string;
  description: string;
  imageUrl?: string;
  price: number;
  originalPrice?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  icon: string;
  rating: number;
  ratingCount?: number;
  location: string;
  paymentMobile?: string;
  isOpen: boolean;
  menu: MenuItem[];
  offers?: Offer[];
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'لقمة وتلقيمة',
    icon: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    location: 'خلف مبنى كلية الهندسة',
    isOpen: true,
    offers: [ ],
    menu: [
      // مشروبات ساخنة
      { id: '1-1', name: 'شاي', price: 5, category: 'مشروبات ساخنة' },
      { id: '1-2', name: 'شاي بلبن', price: 12, category: 'مشروبات ساخنة' },
      { id: '1-3', name: 'حليب', price: 12, category: 'مشروبات ساخنة' },
      { id: '1-4', name: 'اعشاب', price: 5, category: 'مشروبات ساخنة' },
      { id: '1-5', name: 'هوت شوكليت', price: 25, category: 'مشروبات ساخنة' },
      { id: '1-6', name: 'سحلب', price: 15, category: 'مشروبات ساخنة' },
      { id: '1-7', name: 'كركدية', price: 15, category: 'مشروبات ساخنة' },
      
      // القهوة
      { id: '1-8', name: 'امريكانو', price: 35, category: 'القهوة' },
      { id: '1-9', name: 'موكا', price: 30, category: 'القهوة' },
      { id: '1-10', name: 'ميكاتو دبل', price: 35, category: 'القهوة' },
      { id: '1-11', name: 'ميكاتو سينجل', price: 30, category: 'القهوة' },
      { id: '1-12', name: 'كورتادو', price: 35, category: 'القهوة' },
      { id: '1-13', name: 'اسبانش لاتية', price: 30, category: 'القهوة' },
      { id: '1-14', name: 'كوفي ميكس', price: 15, category: 'القهوة' },
      { id: '1-15', name: 'قهوه', price: 15, category: 'القهوة' },
      { id: '1-16', name: 'قهوه دبل', price: 20, category: 'القهوة' },
      { id: '1-17', name: 'قهوه فرنساوي', price: 25, category: 'القهوة' },
      { id: '1-18', name: 'كابتشينو', price: 30, category: 'القهوة' },
      { id: '1-19', name: 'اسبرسو', price: 30, category: 'القهوة' },
      { id: '1-20', name: 'اسبرسو دبل', price: 35, category: 'القهوة' },
      { id: '1-21', name: 'لاتية', price: 30, category: 'القهوة' },
      { id: '1-22', name: 'نسكافية بلاك 2*1', price: 15, category: 'القهوة' },

      // ميلك شيك
      { id: '1-23', name: 'ميلك شيك مكس بيري', price: 45, category: 'ميلك شيك' },
      { id: '1-24', name: 'ميلك شيك تلقيمة', price: 45, category: 'ميلك شيك' },
      { id: '1-25', name: 'ميلك شيك كراميل', price: 40, category: 'ميلك شيك' },
      { id: '1-26', name: 'ميلك شيك اوريو', price: 40, category: 'ميلك شيك' },
      { id: '1-27', name: 'ميلك شيك لوتس', price: 40, category: 'ميلك شيك' },
      { id: '1-28', name: 'ميلك شيك مانجو', price: 40, category: 'ميلك شيك' },
      { id: '1-29', name: 'ميلك شيك فراولة', price: 40, category: 'ميلك شيك' },
      { id: '1-30', name: 'ميلك شيك شيكولاته', price: 40, category: 'ميلك شيك' },

      // موهيتو
      { id: '1-31', name: 'موهيتو تلقيمة', price: 50, category: 'موهيتو' },
      { id: '1-32', name: 'موهيتو بلوكروسو', price: 35, category: 'موهيتو' },
      { id: '1-33', name: 'موهيتو بوبا', price: 45, category: 'موهيتو' },
      { id: '1-34', name: 'موهيتو نعناع', price: 35, category: 'موهيتو' },
      { id: '1-35', name: 'موهيتو كيوي', price: 35, category: 'موهيتو' },
      { id: '1-36', name: 'موهيتو مانجو', price: 35, category: 'موهيتو' },
      { id: '1-37', name: 'موهيتو اناناس', price: 35, category: 'موهيتو' },
      { id: '1-38', name: 'موهيتو ميكس بيري', price: 35, category: 'موهيتو' },
      { id: '1-39', name: 'موهيتو بلوبيري', price: 35, category: 'موهيتو' },

      // عصائر فريش
      { id: '1-40', name: 'عصير جوافة باللبن', price: 35, category: 'عصائر فريش' },
      { id: '1-41', name: 'عصير مانجو', price: 30, category: 'عصائر فريش' },
      { id: '1-42', name: 'عصير فراوله', price: 30, category: 'عصائر فريش' },
      { id: '1-43', name: 'عصير ليمون', price: 15, category: 'عصائر فريش' },
      { id: '1-44', name: 'عصير ليمون نعناع', price: 20, category: 'عصائر فريش' },
      { id: '1-45', name: 'عصير جوافه', price: 30, category: 'عصائر فريش' },

      // ايس كوفي
      { id: '1-46', name: 'ايس تي', price: 25, category: 'ايس كوفي' },
      { id: '1-47', name: 'ايس ماتشا', price: 30, category: 'ايس كوفي' },
      { id: '1-48', name: 'ايس بوبا', price: 40, category: 'ايس كوفي' },
      { id: '1-49', name: 'ايس فرابتشينو فليفر', price: 35, category: 'ايس كوفي' },
      { id: '1-50', name: 'ايس فرابتشينو كلاسيك', price: 30, category: 'ايس كوفي' },
      { id: '1-51', name: 'ايس ميكاتو كراميل', price: 35, category: 'ايس كوفي' },
      { id: '1-52', name: 'ايس موكا وايت', price: 35, category: 'ايس كوفي' },
      { id: '1-53', name: 'ايس موكا دارك', price: 35, category: 'ايس كوفي' },
      { id: '1-54', name: 'ايس كابتشينو', price: 30, category: 'ايس كوفي' },
      { id: '1-55', name: 'ايس اسبريسو', price: 30, category: 'ايس كوفي' },
      { id: '1-56', name: 'ايس سبانش لاتيه', price: 30, category: 'ايس كوفي' },
      { id: '1-57', name: 'ايس لاتية', price: 25, category: 'ايس كوفي' },
      { id: '1-58', name: 'آيس كوفي', price: 25, category: 'ايس كوفي' },

      // سموزي
      { id: '1-59', name: 'سموزي كيوي', price: 35, category: 'سموزي' },
      { id: '1-60', name: 'سموزي مانجو', price: 35, category: 'سموزي' },
      { id: '1-61', name: 'سموزي ميكس بيري', price: 40, category: 'سموزي' },
      { id: '1-62', name: 'سموزي بلوبيري', price: 40, category: 'سموزي' },
      { id: '1-63', name: 'سموزي اناناس', price: 35, category: 'سموزي' },

      // مشروبات باردة
      { id: '1-64', name: 'بيبسي اكشن', price: 15, category: 'مشروبات باردة' },
      { id: '1-65', name: 'ماكس كانز', price: 20, category: 'مشروبات باردة' },
      { id: '1-66', name: 'مشروب تويست', price: 20, category: 'مشروبات باردة' },
      { id: '1-67', name: 'ستينج صغير', price: 15, category: 'مشروبات باردة' },
      { id: '1-68', name: 'بريل', price: 20, category: 'مشروبات باردة' },
      { id: '1-69', name: 'في كولا', price: 20, category: 'مشروبات باردة' },
      { id: '1-70', name: 'عصير مكس شيكولاته', price: 15, category: 'مشروبات باردة' },
      { id: '1-71', name: 'مياه دسانى كبيره', price: 10, category: 'مشروبات باردة' },
      { id: '1-72', name: 'مياه دسانى صغيرة', price: 5, category: 'مشروبات باردة' },
      { id: '1-73', name: 'عصير جهينه', price: 12, category: 'مشروبات باردة' },

      // ايس كريم
      { id: '1-74', name: 'كوكيز ويتش', price: 10, category: 'ايس كريم' },
      { id: '1-75', name: 'كوب فايف جي', price: 15, category: 'ايس كريم' },
      { id: '1-76', name: 'كونو كومبو', price: 15, category: 'ايس كريم' },
      { id: '1-77', name: 'كونو كومبو بيستاشيو', price: 20, category: 'ايس كريم' },
      { id: '1-78', name: 'استيك اسنيكرز شيكولاته', price: 20, category: 'ايس كريم' },
      { id: '1-79', name: 'استيك فولكانو شيكولاتة', price: 20, category: 'ايس كريم' },

      // حلويات وتسالي
      { id: '1-80', name: 'إندومي كيس', price: 15, category: 'حلويات وتسالي' },
      { id: '1-81', name: 'باتيه', price: 15, category: 'حلويات وتسالي' },
      { id: '1-82', name: 'نصف وافل', price: 25, category: 'حلويات وتسالي' },
      { id: '1-83', name: 'وافل كامل', price: 50, category: 'حلويات وتسالي' },
      { id: '1-84', name: 'كاندى مشكل', price: 10, category: 'حلويات وتسالي' },
      { id: '1-85', name: 'لب سوبر', price: 10, category: 'حلويات وتسالي' },
      { id: '1-86', name: 'اندومى كوب', price: 20, category: 'حلويات وتسالي' },
      { id: '1-87', name: 'فشار', price: 5, category: 'حلويات وتسالي' },

      // أطباق
      { id: '1-88', name: 'ريزو بطاطس بوم فريت بالصوص', price: 35, category: 'أطباق' },
      { id: '1-89', name: 'طبق جبنه بالطماطم', price: 15, category: 'أطباق' },
      { id: '1-90', name: 'طبق سلطة', price: 5, category: 'أطباق' },
      { id: '1-91', name: 'طبق فول اسكندرانى', price: 12.5, category: 'أطباق' },
      { id: '1-92', name: 'طبق تشكيلة 30', price: 30, category: 'أطباق' },
      { id: '1-93', name: 'طبق تشكيلة 20', price: 20, category: 'أطباق' },
      { id: '1-94', name: 'طبق بطاطس مقليه', price: 15, category: 'أطباق' },
      { id: '1-95', name: 'طبق بطاطس مهروسة', price: 12.5, category: 'أطباق' },
      { id: '1-96', name: 'طبق فول', price: 12.5, category: 'أطباق' },
      { id: '1-97', name: 'طبق طعمية عادية بالقرص', price: 1.25, category: 'أطباق' },
      { id: '1-98', name: 'طبق طعمية محشية بالقرص', price: 2.5, category: 'أطباق' },
      { id: '1-99', name: 'طبق باذنجان', price: 10, category: 'أطباق' },
      { id: '1-100', name: 'طبق بابا غنوج', price: 12.5, category: 'أطباق' },
      { id: '1-101', name: 'طبق جبنه', price: 15, category: 'أطباق' },
      { id: '1-102', name: 'طبق مسقعه', price: 12.5, category: 'أطباق' },
      { id: '1-103', name: 'طبق بيض اومليت', price: 15, category: 'أطباق' },
      { id: '1-104', name: 'طبق بيض مسلوق بالقطعه', price: 15, category: 'أطباق' },
      { id: '1-105', name: 'علبة طرشي', price: 3, category: 'أطباق' },

      // ساندوتشات البطاطس
      { id: '1-106', name: 'س بطاطس فينو', price: 13, category: 'ساندوتشات البطاطس' },
      { id: '1-107', name: 'س بطاطس بصوص تكساس', price: 15, category: 'ساندوتشات البطاطس' },
      { id: '1-108', name: 'س بطاطس بصوص ميكس جبنه', price: 15, category: 'ساندوتشات البطاطس' },
      { id: '1-109', name: 'س بطاطس بصوص الشيدر', price: 15, category: 'ساندوتشات البطاطس' },
      { id: '1-110', name: 'س بطاطس شيبسى', price: 10, category: 'ساندوتشات البطاطس' },
      { id: '1-111', name: 'س بطاطس مقليه', price: 11, category: 'ساندوتشات البطاطس' },
      { id: '1-112', name: 'س بطاطس بوريه', price: 11, category: 'ساندوتشات البطاطس' },
      { id: '1-113', name: 'س بطاطس وباذنجان', price: 13, category: 'ساندوتشات البطاطس' },
      { id: '1-114', name: 'س بطاطس وبابا غنوج', price: 13, category: 'ساندوتشات البطاطس' },
      { id: '1-115', name: 'س بطاطس بالبيض المقلى', price: 17, category: 'ساندوتشات البطاطس' },
      { id: '1-116', name: 'س بطاطس بالبيض المسلوق', price: 17, category: 'ساندوتشات البطاطس' },

      // فطار
      { id: '1-117', name: 'س بطاطس كاتشب ومايونيز', price: 15, category: 'فطار' },
      { id: '1-118', name: 'س بطاطس بانيه', price: 15, category: 'فطار' },
      { id: '1-119', name: 'بطاطس بالجبنه', price: 15, category: 'فطار' },
      { id: '1-120', name: 'بيضه مسلوقه', price: 10, category: 'فطار' },
      { id: '1-121', name: 'س ديناميت', price: 17, category: 'فطار' },
      { id: '1-122', name: 'س ميكس جبنه لانشون', price: 20, category: 'فطار' },
      { id: '1-123', name: 'س رومى لانشون', price: 25, category: 'فطار' },
      { id: '1-124', name: 'س بيض بالجبنه الرومى', price: 20, category: 'فطار' },
      { id: '1-125', name: 'س باذنجان', price: 7.5, category: 'فطار' },
      { id: '1-126', name: 'س بيض مسلوق', price: 12.5, category: 'فطار' },
      { id: '1-127', name: 'س بيض مقلى', price: 12.5, category: 'فطار' },
      { id: '1-128', name: 'عيش', price: 1.5, category: 'فطار' },
      { id: '1-129', name: 'س لانشون فراخ', price: 15, category: 'فطار' },
      { id: '1-130', name: 'س لانشون بيف', price: 15, category: 'فطار' },
      { id: '1-131', name: 'جبنة رومي مقلية', price: 15, category: 'فطار' },
      { id: '1-132', name: 'جبنة رومي', price: 15, category: 'فطار' },
      { id: '1-133', name: 'جبنة بيضاء بالطماطم', price: 10, category: 'فطار' },
      { id: '1-134', name: 'س بيض مقلى او مسلوق', price: 15, category: 'فطار' },
      { id: '1-135', name: 'س بابا غنوج', price: 12.5, category: 'فطار' },
      { id: '1-136', name: 'س شكشوكة', price: 15, category: 'فطار' },
      { id: '1-137', name: 'ساندوتش مسقعه', price: 12.5, category: 'فطار' },
      { id: '1-138', name: 'س حلاوة بالقشطة', price: 15, category: 'فطار' },

      // ساندوتشات الطعمية
      { id: '1-139', name: 'طعمية فينو', price: 9, category: 'ساندوتشات الطعمية' },
      { id: '1-140', name: 'س طعمية بطاطس باذنجان', price: 12.5, category: 'ساندوتشات الطعمية' },
      { id: '1-141', name: 'س طعمية عادى', price: 7.5, category: 'ساندوتشات الطعمية' },
      { id: '1-142', name: 'س طعمية محشية', price: 9, category: 'ساندوتشات الطعمية' },
      { id: '1-143', name: 'س طعمية وبطاطس', price: 9, category: 'ساندوتشات الطعمية' },
      { id: '1-144', name: 'س طعمية وباذنجان', price: 9, category: 'ساندوتشات الطعمية' },
      { id: '1-145', name: 'س طعمية وبابا غنوج', price: 9, category: 'ساندوتشات الطعمية' },
      { id: '1-146', name: 'س طعمية بالبيض المقلى', price: 12.5, category: 'ساندوتشات الطعمية' },
      { id: '1-147', name: 'س طعمية بالبيض المسلوق', price: 12.5, category: 'ساندوتشات الطعمية' },

      // ساندوتشات الفول
      { id: '1-148', name: 'س فول بالطحينة', price: 11, category: 'ساندوتشات الفول' },
      { id: '1-149', name: 'فول اسكندرانى', price: 9, category: 'ساندوتشات الفول' },
      { id: '1-150', name: 'س الفول', price: 7.5, category: 'ساندوتشات الفول' },
      { id: '1-151', name: 'س فول على بابا غنوج', price: 9, category: 'ساندوتشات الفول' },
      { id: '1-152', name: 'س فول على فلافل', price: 9, category: 'ساندوتشات الفول' },
      { id: '1-153', name: 'س فول على باذنجان', price: 9, category: 'ساندوتشات الفول' },
      { id: '1-154', name: 'س فول بالبيض المقلى', price: 12.5, category: 'ساندوتشات الفول' },
      { id: '1-155', name: 'س فول بالبيض المسلوق', price: 12.5, category: 'ساندوتشات الفول' },
      { id: '1-156', name: 'س فول بالبسطرمة', price: 25, category: 'ساندوتشات الفول' },
      { id: '1-157', name: 'س فول بالسجق', price: 20, category: 'ساندوتشات الفول' },

      // عيش سورى وتورتيلا
      { id: '1-158', name: 'شاورما عيش سورى', price: 45, category: 'عيش سورى وتورتيلا' },
      { id: '1-159', name: 'بطاطس عيش سورى', price: 35, category: 'عيش سورى وتورتيلا' },
      { id: '1-160', name: 'بانيه عيش تورتيلا', price: 40, category: 'عيش سورى وتورتيلا' },
      { id: '1-161', name: 'بطاطس موتزاريلا بعيش التورتيلا', price: 50, category: 'عيش سورى وتورتيلا' },
      { id: '1-162', name: 'كبدة تورتيلا بصوص الجبنه', price: 40, category: 'عيش سورى وتورتيلا' },
      { id: '1-163', name: 'شاورما تورتيلا بصوص الجبنه', price: 50, category: 'عيش سورى وتورتيلا' },
      { id: '1-164', name: 'بطاطس بعيش التورتيلا', price: 35, category: 'عيش سورى وتورتيلا' },

      // فرايد تشكن
      { id: '1-165', name: 'ساندوتش فرايد تشيكن سينجل', price: 69, category: 'فرايد تشكن' },
      { id: '1-166', name: 'وجبه فرايد تشيكن 3 قطعه', price: 135, category: 'فرايد تشكن' },
      { id: '1-167', name: 'وجبه فرايد تشيكن 2 قطعه', price: 105, category: 'فرايد تشكن' },
      { id: '1-168', name: 'وجبه فرايد تشيكن 1 قطعه', price: 75, category: 'فرايد تشكن' },

      // كريب
      { id: '1-169', name: 'كريب بطاطس بوم فريت', price: 45, category: 'كريب' },
      { id: '1-170', name: 'كريب كفته', price: 70, category: 'كريب' },
      { id: '1-171', name: 'كريب استربس فراخ', price: 70, category: 'كريب' },
      { id: '1-172', name: 'كريب شاورما فراخ ميكس', price: 85, category: 'كريب' },
      { id: '1-173', name: 'كريب شاورما فراخ', price: 70, category: 'كريب' },

      // غداء
      { id: '1-174', name: 'أرز شاورما فراخ', price: 45, category: 'غداء' },
      { id: '1-175', name: 'أرز بالكبدة', price: 40, category: 'غداء' },
      { id: '1-176', name: 'فتة شاورما فراخ', price: 55, category: 'غداء' },
      { id: '1-177', name: 'مكرونة بالكبدة', price: 45, category: 'غداء' },
      { id: '1-178', name: 'مكرونة بالشاورما', price: 50, category: 'غداء' },
      { id: '1-179', name: 'ساندوتش سجق', price: 30, category: 'غداء' },
      { id: '1-180', name: 'ساندوتش برجر بالجبنه والبيض', price: 40, category: 'غداء' },
      { id: '1-181', name: 'ساندوتش برجر بالبيض المقلى', price: 35, category: 'غداء' },
      { id: '1-182', name: 'ساندوتش كبده اسكندرانى', price: 25, category: 'غداء' },
      { id: '1-183', name: 'ساندويش برجر', price: 30, category: 'غداء' },
      { id: '1-184', name: 'ساندويش برجر بالجبنه', price: 35, category: 'غداء' },
      { id: '1-185', name: 'ساندويتش شاورمه الفراخ', price: 30, category: 'غداء' },
      { id: '1-186', name: 'ساندويش بانية ناجتس', price: 30, category: 'غداء' },
      { id: '1-187', name: 'حواوشى', price: 30, category: 'غداء' },
      { id: '1-188', name: 'ساندويش كفتة', price: 30, category: 'غداء' },
      { id: '1-189', name: 'ساندويش هوت دوج', price: 30, category: 'غداء' },
      { id: '1-190', name: 'ساندوتش استربس فراخ', price: 35, category: 'غداء' },
      { id: '1-191', name: 'ساندوتش سوسيس', price: 30, category: 'غداء' },

      // ركن الكومبو
      { id: '1-192', name: 'كومبو كريب بطاطس بوم فريت وماكس كولا', price: 50, category: 'ركن الكومبو' },
      { id: '1-193', name: 'كومبو كريب كفته وماكس كولا', price: 75, category: 'ركن الكومبو' },
      { id: '1-194', name: 'كومبو كريب ستربس فراخ وماكس كولا', price: 75, category: 'ركن الكومبو' },
      { id: '1-195', name: 'كومبو كريب شاورما فراخ ميكس وماكس كولا', price: 90, category: 'ركن الكومبو' },
      { id: '1-196', name: 'كومبو كريب شاورما فراخ وماكس كولا', price: 75, category: 'ركن الكومبو' },
      { id: '1-197', name: 'كومبو ساندوتش شاورما فراخ وماكس كولا', price: 50, category: 'ركن الكومبو' },
      { id: '1-198', name: 'كومبو 2 ساندوتش كبده وماكس كولا', price: 55, category: 'ركن الكومبو' },
      { id: '1-199', name: 'كومبو وجبه فرايد 3 قطعه وماكس كولا وبطاطس', price: 140, category: 'ركن الكومبو' },
      { id: '1-200', name: 'كومبو وجبه فرايد 2 قطعه وماكس كولا وبطاطس', price: 110, category: 'ركن الكومبو' },
      { id: '1-201', name: 'كومبو وجبه فرايد قطعه وماكس كولا وبطاطس', price: 80, category: 'ركن الكومبو' },
      { id: '1-202', name: 'كومبو ساندوتش فرايد سينجل وماكس كولا وبطاطس', price: 75, category: 'ركن الكومبو' },
      { id: '1-203', name: 'كومبو برجر وبطاطس وماكس كولا', price: 55, category: 'ركن الكومبو' },
      { id: '1-204', name: 'وجبه استربس وبطاطس وماكس كولا', price: 95, category: 'ركن الكومبو' },
      { id: '1-205', name: 'وجبه شاورما فراخ وبطاطس وماكس كولا', price: 95, category: 'ركن الكومبو' },
      { id: '1-206', name: 'وجبه كبده وبطاطس وماكس كولا', price: 85, category: 'ركن الكومبو' },
      { id: '1-207', name: 'وجبه سجق وبطاطس وماكس كولا', price: 85, category: 'ركن الكومبو' },
    ]
  },
  {
    id: '2',
    name: 'فيستيفال لاند (Festival Land)',
    icon: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop',
    rating: 4.7,
    location: 'أمام مبنى كلية الصيدلة',
    isOpen: true,
    menu: [
      // ساندوتشات افطار
      { id: '2-1', name: 'ساندوتش طعمية', price: 10, category: 'ساندوتشات افطار' },
      { id: '2-2', name: 'ساندوتش بطاطس سادة', price: 12, category: 'ساندوتشات افطار' },
      { id: '2-3', name: 'ساندوتش بطاطس كاتشب', price: 13, category: 'ساندوتشات افطار' },
      { id: '2-4', name: 'ساندوتش بطاطس فينو', price: 15, category: 'ساندوتشات افطار' },
      { id: '2-5', name: 'ساندوتش فول', price: 10, category: 'ساندوتشات افطار' },
      { id: '2-6', name: 'ساندوتش بابا غنوج', price: 10, category: 'ساندوتشات افطار' },
      { id: '2-7', name: 'ساندوتش مسقعة', price: 10, category: 'ساندوتشات افطار' },
      { id: '2-8', name: 'ساندوتش جبنة بيضاء بالطماطم', price: 10, category: 'ساندوتشات افطار' },
      { id: '2-9', name: 'ساندوتش شكشوكة', price: 15, category: 'ساندوتشات افطار' },
      { id: '2-10', name: 'ساندوتش بيض مسلوق', price: 12, category: 'ساندوتشات افطار' },
      { id: '2-11', name: 'ساندوتش بيض اومليت (خضار-بسطرمة)', price: 25, category: 'ساندوتشات افطار' },
      { id: '2-12', name: 'ساندوتش بطاطس مهروسة', price: 10, category: 'ساندوتشات افطار' },

      // افتكاسات الافطار
      { id: '2-13', name: 'باكت بطاطس سادة', price: 17, category: 'افتكاسات الافطار' },
      { id: '2-14', name: 'باكت بطاطس كاتشب مايونيز-هالبينو', price: 25, category: 'افتكاسات الافطار' },

      // سندوتشات الغداء
      { id: '2-15', name: 'شاورما فراخ', price: 55, category: 'سندوتشات الغداء' },
      { id: '2-16', name: 'بانيه', price: 65, category: 'سندوتشات الغداء' },
      { id: '2-17', name: 'تشيكن كريسبي', price: 65, category: 'سندوتشات الغداء' },
      { id: '2-18', name: 'شيش طاووق', price: 70, category: 'سندوتشات الغداء' },
      { id: '2-19', name: 'فاهيتا فراخ', price: 70, category: 'سندوتشات الغداء' },
      { id: '2-20', name: 'كوردن بلو', price: 75, category: 'سندوتشات الغداء' },
      { id: '2-21', name: 'تشيكن استربس', price: 70, category: 'سندوتشات الغداء' },
      { id: '2-22', name: 'زنجر حار', price: 70, category: 'سندوتشات الغداء' },

      // افتكاسات غداء
      { id: '2-23', name: 'فتة شاورما (ارز بسمتي - شاورما فراخ)', price: 40, category: 'افتكاسات غداء' },
      { id: '2-24', name: 'روزيتو (ارز بسمتي - بانيه)', price: 40, category: 'افتكاسات غداء' },
      { id: '2-25', name: 'بطاطسيكو (بطاطس + شاورما فراخ)', price: 40, category: 'افتكاسات غداء' },

      // البيتزا
      { id: '2-26', name: 'بيتزا فراخ', price: 75, category: 'البيتزا' },
      { id: '2-27', name: 'تشيكن باربيكيو', price: 80, category: 'البيتزا' },
      { id: '2-28', name: 'بيتزا لحمه', price: 80, category: 'البيتزا' },
      { id: '2-29', name: 'بيتزا سجق', price: 70, category: 'البيتزا' },
      { id: '2-30', name: 'بيتزا سوسيس', price: 70, category: 'البيتزا' },
      { id: '2-31', name: 'بيتزا مكس جبن', price: 70, category: 'البيتزا' },
      { id: '2-32', name: 'بيتزا مارجريتا', price: 70, category: 'البيتزا' },
      { id: '2-33', name: 'بيتزا خضروات', price: 70, category: 'البيتزا' },
      { id: '2-34', name: 'بيتزا مكس لحوم', price: 90, category: 'البيتزا' },
      { id: '2-35', name: 'تشيكن ببروني', price: 90, category: 'البيتزا' },
      { id: '2-36', name: 'بيتزا سلامي', price: 90, category: 'البيتزا' },

      // الكريب
      { id: '2-37', name: 'كريب شيش طاووق - استربس - فاهيتا', price: 85, category: 'الكريب' },
      { id: '2-38', name: 'كريب (لحمة - بانيه - شاورما فراخ - ميكس جبن - سجق - سوسيس - مشروم)', price: 80, category: 'الكريب' },
      { id: '2-39', name: 'كريب بطاطس بالموتزريلا + كاتشب', price: 35, category: 'الكريب' },

      // الاندومي
      { id: '2-40', name: 'اندومي خضار - لحمه - سجق - فراخ كاري', price: 20, category: 'الاندومي' },

      // طواجن الحلو
      { id: '2-41', name: 'طاجن نوتيلا', price: 55, category: 'طواجن الحلو' },
      { id: '2-42', name: 'طاجن لوتس', price: 55, category: 'طواجن الحلو' },
      { id: '2-43', name: 'طاجن اوريو', price: 60, category: 'طواجن الحلو' },
      { id: '2-44', name: 'طاجن بستاشيو', price: 70, category: 'طواجن الحلو' },
      { id: '2-45', name: 'طاجن ابو قلبين (ميكس صوص)', price: 70, category: 'طواجن الحلو' },

      // Desserts
      { id: '2-46', name: 'مولتن كيك شوكولاته', price: 70, category: 'Desserts' },
      { id: '2-47', name: 'مولتن كيك شوكولاته + ايس', price: 75, category: 'Desserts' },
      { id: '2-48', name: 'تشيز كيك سادة', price: 60, category: 'Desserts' },
      { id: '2-49', name: 'تشيز كيك (ريد فلفل - فاوج)', price: 65, category: 'Desserts' },
      { id: '2-50', name: 'دسباسيتو', price: 65, category: 'Desserts' },

      // المشروبات الساخنة
      { id: '2-51', name: 'شاي فتله (ليبتون - العروسة)', price: 7, category: 'المشروبات الساخنة' },
      { id: '2-52', name: 'شاي احمد تي طعم مختلف', price: 12, category: 'المشروبات الساخنة' },
      { id: '2-53', name: 'شاي كرك كلاسيك', price: 20, category: 'المشروبات الساخنة' },
      { id: '2-54', name: 'شاي كرك حليب', price: 30, category: 'المشروبات الساخنة' },
      { id: '2-55', name: 'ينسون - نعناع - كركدية', price: 10, category: 'المشروبات الساخنة' },
      { id: '2-56', name: 'مكمل اعشاب (جنزبيل - قرفة - ليمون)', price: 20, category: 'المشروبات الساخنة' },
      { id: '2-57', name: 'قهوة تركي', price: 15, category: 'المشروبات الساخنة' },
      { id: '2-58', name: 'قهوة تركي دوبل', price: 25, category: 'المشروبات الساخنة' },
      { id: '2-59', name: 'نسكافية 3*1 - 2*1 - بلاك', price: 20, category: 'المشروبات الساخنة' },
      { id: '2-60', name: 'نسكافية وايت', price: 30, category: 'المشروبات الساخنة' },
      { id: '2-61', name: 'قهوة فرنساوي', price: 30, category: 'المشروبات الساخنة' },
      { id: '2-62', name: 'قهوة فليفر (بندق - فانيليا - كراميل - لوتس)', price: 30, category: 'المشروبات الساخنة' },
      { id: '2-63', name: 'هوت شوكلت', price: 30, category: 'المشروبات الساخنة' },
      { id: '2-64', name: 'هوت اوريو', price: 40, category: 'المشروبات الساخنة' },
      { id: '2-65', name: 'اسبرسو', price: 35, category: 'المشروبات الساخنة' },
      { id: '2-66', name: 'سحلب سادة', price: 30, category: 'المشروبات الساخنة' },
      { id: '2-67', name: 'سحلب - مكسرات - فواكه', price: 40, category: 'المشروبات الساخنة' },
      { id: '2-68', name: 'هوت لاتيه', price: 40, category: 'المشروبات الساخنة' },
      { id: '2-69', name: 'شاي حليب', price: 20, category: 'المشروبات الساخنة' },

      // مشروبات الكافيين
      { id: '2-70', name: 'ايس لاتيه', price: 40, category: 'مشروبات الكافيين' },
      { id: '2-71', name: 'ايس اسبنش لاتيه', price: 50, category: 'مشروبات الكافيين' },
      { id: '2-72', name: 'ايس موكا (وايت - دارك)', price: 40, category: 'مشروبات الكافيين' },
      { id: '2-73', name: 'ايس كوفي (كراميل - شوكليت)', price: 40, category: 'مشروبات الكافيين' },
      { id: '2-74', name: 'ايس ماتشا', price: 40, category: 'مشروبات الكافيين' },
      { id: '2-75', name: 'ايس ماتشا (مانجو - فراوله)', price: 45, category: 'مشروبات الكافيين' },

      // افتكاسات مشروبات
      { id: '2-76', name: 'فلوريدا (مانجو - جوافة - فراوله)', price: 60, category: 'افتكاسات مشروبات' },
      { id: '2-77', name: 'طبطبه (مانجو - فراوله - بلوبيري)', price: 60, category: 'افتكاسات مشروبات' },
      { id: '2-78', name: 'اروبيكال (طبطبه - بلو كرواسو - ايس كريم)', price: 60, category: 'افتكاسات مشروبات' },
      { id: '2-79', name: 'ميراچ (افكادو - ميلك مانجو - ايس كريم)', price: 65, category: 'افتكاسات مشروبات' },
      { id: '2-80', name: 'اصفهاني (مانجو - موز - ايس كريم - بلو بيري)', price: 65, category: 'افتكاسات مشروبات' },
      { id: '2-81', name: 'افوتوت (افوكادو - قطع فواكه مانجو)', price: 70, category: 'افتكاسات مشروبات' },
      { id: '2-82', name: 'بينا كولاجا (جوز هند - اناناس - حليب - ايس كريم)', price: 60, category: 'افتكاسات مشروبات' },
      { id: '2-83', name: 'شوشو (حب رومان - ميلك فراوله - ايس كريم)', price: 60, category: 'افتكاسات مشروبات' },
      { id: '2-84', name: 'ميكس باشون (مانجو - كيوي - باشون - موز)', price: 60, category: 'افتكاسات مشروبات' },
      { id: '2-85', name: 'كاريوكي (بلح - ايس كريم - سوداني)', price: 60, category: 'افتكاسات مشروبات' },
      { id: '2-86', name: 'دلع بنات (بلوكورولسون - ايس كريم - ميلك فراوله)', price: 60, category: 'افتكاسات مشروبات' },
      { id: '2-87', name: 'ميكس باور (افكادو - مكسرات - عسل)', price: 70, category: 'افتكاسات مشروبات' },

      // عصير فريش
      { id: '2-88', name: 'عصير ليمون', price: 20, category: 'عصير فريش' },
      { id: '2-89', name: 'عصير مانجو فريش', price: 35, category: 'عصير فريش' },
      { id: '2-90', name: 'عصير فراولة فريش', price: 35, category: 'عصير فريش' },
      { id: '2-91', name: 'عصير جوافة فريش', price: 35, category: 'عصير فريش' },
      { id: '2-92', name: 'عصير بطيخ فريش', price: 35, category: 'عصير فريش' },
      { id: '2-93', name: 'عصير كانتلوب فريش', price: 35, category: 'عصير فريش' },
      { id: '2-94', name: 'عصير كيوي فريش', price: 40, category: 'عصير فريش' },
      { id: '2-95', name: 'عصير موز فريش', price: 35, category: 'عصير فريش' },
      { id: '2-96', name: 'عصير خوخ فريش', price: 35, category: 'عصير فريش' },
      { id: '2-97', name: 'عصير برقوق فريش', price: 35, category: 'عصير فريش' },
    ]
  },
  {
    id: '3',
    name: 'PARA TI',
    icon: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400&auto=format&fit=crop',
    rating: 4.6,
    location: 'خلف مبنى كلية طب الفم والأسنان',
    isOpen: true,
    menu: [
      // ساندوتشات
      { id: '3-1', name: 'ساندوتش جبنه رومي', price: 22, category: 'ساندوتشات' },
      { id: '3-2', name: 'ساندوتش جبنه بالطماطم', price: 12, category: 'ساندوتشات' },
      { id: '3-3', name: 'ساندوتش بطاطس', price: 13, category: 'ساندوتشات' },
      { id: '3-4', name: 'ساندوتش بطاطس كاتشب', price: 15, category: 'ساندوتشات' },
      { id: '3-5', name: 'ساندوتش طعميه وبطاطس', price: 15, category: 'ساندوتشات' },
      { id: '3-6', name: 'ساندوتش مشكل', price: 15, category: 'ساندوتشات' },
      { id: '3-7', name: 'ساندوتش فول', price: 10, category: 'ساندوتشات' },
      { id: '3-8', name: 'ساندوتش بيض', price: 12, category: 'ساندوتشات' },
      { id: '3-9', name: 'ساندوتش بابا غنوج', price: 10, category: 'ساندوتشات' },
      { id: '3-10', name: 'ساندوتش شكشوكة', price: 15, category: 'ساندوتشات' },
      { id: '3-11', name: 'ساندوتش بطاطس بوريه', price: 12, category: 'ساندوتشات' },
      { id: '3-12', name: 'ساندوتش مسقعه', price: 10, category: 'ساندوتشات' },

      // ساندوتشات لحوم
      { id: '3-13', name: 'ساندوتش برجر اطياب', price: 40, category: 'ساندوتشات لحوم' },
      { id: '3-14', name: 'ساندوتش برجر اطياب بالجبنه', price: 45, category: 'ساندوتشات لحوم' },
      { id: '3-15', name: 'ساندوتش شاورمه فراخ', price: 45, category: 'ساندوتشات لحوم' },
      { id: '3-16', name: 'ساندوتش فراخ بانيه', price: 45, category: 'ساندوتشات لحوم' },
      { id: '3-17', name: 'ساندوتش كبده اسكندراني', price: 35, category: 'ساندوتشات لحوم' },

      // إضافات
      { id: '3-18', name: 'طبق بطاطس مقليه', price: 20, category: 'إضافات' },
      { id: '3-19', name: 'طلب طعميه وباذنجان', price: 15, category: 'إضافات' },
      { id: '3-20', name: 'كاتشب ظرف', price: 3, category: 'إضافات' },
      { id: '3-21', name: 'مخلل', price: 5, category: 'إضافات' },
      { id: '3-22', name: 'فشار صغير', price: 10, category: 'إضافات' },
      { id: '3-23', name: 'فشار كبير', price: 15, category: 'إضافات' },

      // مشروبات الساخنه
      { id: '3-24', name: 'شاي', price: 7, category: 'مشروبات الساخنه' },
      { id: '3-25', name: 'شاي باللبن', price: 15, category: 'مشروبات الساخنه' },
      { id: '3-26', name: 'قهوه', price: 15, category: 'مشروبات الساخنه' },
      { id: '3-27', name: 'قهوه فرنساوي', price: 25, category: 'مشروبات الساخنه' },
      { id: '3-28', name: 'كابتشينو', price: 30, category: 'مشروبات الساخنه' },
      { id: '3-29', name: 'اسبرسو', price: 20, category: 'مشروبات الساخنه' },
      { id: '3-30', name: 'اعشاب', price: 10, category: 'مشروبات الساخنه' },
      { id: '3-31', name: 'نسكافيه 3*1', price: 17, category: 'مشروبات الساخنه' },
      { id: '3-32', name: 'حليب', price: 15, category: 'مشروبات الساخنه' },

      // مشروبات البارده
      { id: '3-33', name: 'عصير جهينه', price: 15, category: 'مشروبات البارده' },
      { id: '3-34', name: 'عصير بخيره', price: 10, category: 'مشروبات البارده' },
      { id: '3-35', name: 'كانز جيب', price: 15, category: 'مشروبات البارده' },
      { id: '3-36', name: 'شنايدر', price: 20, category: 'مشروبات البارده' },
      { id: '3-37', name: 'بيريل', price: 20, category: 'مشروبات البارده' },
      { id: '3-38', name: 'فيروز', price: 20, category: 'مشروبات البارده' },
      { id: '3-39', name: 'مياه صغيره', price: 5, category: 'مشروبات البارده' },
      { id: '3-40', name: 'مياه كبيره', price: 10, category: 'مشروبات البارده' },
      { id: '3-41', name: 'اندومي', price: 20, category: 'مشروبات البارده' },
    ]
  },
  {
    id: '4',
    name: 'هلا (Hala)',
    icon: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=400&auto=format&fit=crop',
    rating: 4.8,
    location: 'خلف مبنى كلية الطب البيطري',
    isOpen: true,
    offers: [ ],
    menu: [
      // المشروبات الساخنة
      { id: '4-1', name: 'شاي', price: 10, category: 'المشروبات الساخنة' },
      { id: '4-2', name: 'أعشاب', price: 10, category: 'المشروبات الساخنة' },
      { id: '4-3', name: 'شاي بلبن', price: 20, category: 'المشروبات الساخنة' },
      { id: '4-4', name: 'سحلب مكسرات', price: 30, category: 'المشروبات الساخنة' },
      { id: '4-5', name: 'مكس أعشاب', price: 20, category: 'المشروبات الساخنة' },
      { id: '4-6', name: 'هوت سيدر', price: 25, category: 'المشروبات الساخنة' },
      { id: '4-7', name: 'هوت شوكليت', price: 35, category: 'المشروبات الساخنة' },
      { id: '4-8', name: 'هوت شوكليت نوتيلا', price: 45, category: 'المشروبات الساخنة' },
      { id: '4-9', name: 'هوت أوريو', price: 45, category: 'المشروبات الساخنة' },
      { id: '4-10', name: 'قهوة تركي', price: 15, category: 'المشروبات الساخنة' },
      { id: '4-11', name: 'قهوة دبل', price: 20, category: 'المشروبات الساخنة' },
      { id: '4-12', name: 'نسكافيه بلاك', price: 20, category: 'المشروبات الساخنة' },
      { id: '4-13', name: 'قهوة فرنساوي', price: 25, category: 'المشروبات الساخنة' },
      { id: '4-14', name: 'قهوة بندق', price: 30, category: 'المشروبات الساخنة' },
      { id: '4-15', name: 'قهوة شوكليت', price: 30, category: 'المشروبات الساخنة' },
      { id: '4-16', name: 'نسكافيه بلبن', price: 30, category: 'المشروبات الساخنة' },
      { id: '4-17', name: 'قهوة نوتيلا', price: 35, category: 'المشروبات الساخنة' },

      // ميلك شيك
      { id: '4-18', name: 'شيكولاتة / فانيليا / فراولة / مانجو', price: 40, category: 'ميلك شيك' },
      { id: '4-19', name: 'بلو بيري / كراميل', price: 45, category: 'ميلك شيك' },
      { id: '4-20', name: 'أوريو / لوتس / نوتيلا', price: 50, category: 'ميلك شيك' },

      // اسبريسو
      { id: '4-21', name: 'اسبريسو', price: 25, category: 'اسبريسو' },
      { id: '4-22', name: 'اسبريسو دبل', price: 30, category: 'اسبريسو' },
      { id: '4-23', name: 'اسبريسو ميكاتو', price: 30, category: 'اسبريسو' },
      { id: '4-24', name: 'كراميل ميكاتو', price: 35, category: 'اسبريسو' },
      { id: '4-25', name: 'فلات وايت', price: 35, category: 'اسبريسو' },
      { id: '4-26', name: 'كورتادو', price: 35, category: 'اسبريسو' },
      { id: '4-27', name: 'كوفي لاتيه', price: 35, category: 'اسبريسو' },
      { id: '4-28', name: 'لاتيه موكا', price: 40, category: 'اسبريسو' },
      { id: '4-29', name: 'كابتشينو', price: 40, category: 'اسبريسو' },
      { id: '4-30', name: 'كابتشينو فليفر', price: 45, category: 'اسبريسو' },
      { id: '4-31', name: 'كابتشينو لارج', price: 50, category: 'اسبريسو' },
      { id: '4-32', name: 'كوفي لاتيه لارج', price: 45, category: 'اسبريسو' },
      { id: '4-33', name: 'امريكان كوفي بلاك', price: 30, category: 'اسبريسو' },
      { id: '4-34', name: 'امريكان كوفي ميلك', price: 35, category: 'اسبريسو' },

      // مشروبات باردة (عصير)
      { id: '4-35', name: 'مانجو عصير', price: 35, category: 'مشروبات باردة' },
      { id: '4-36', name: 'فراولة عصير', price: 35, category: 'مشروبات باردة' },
      { id: '4-37', name: 'جوافة عصير', price: 30, category: 'مشروبات باردة' },
      { id: '4-38', name: 'ليمون عصير', price: 25, category: 'مشروبات باردة' },
      { id: '4-39', name: 'ليمون نعناع عصير', price: 30, category: 'مشروبات باردة' },
      { id: '4-40', name: 'برتقال عصير', price: 25, category: 'مشروبات باردة' },
      { id: '4-41', name: 'جوافة ميلك عصير', price: 35, category: 'مشروبات باردة' },
      { id: '4-42', name: 'موز ميلك عصير', price: 30, category: 'مشروبات باردة' },
      { id: '4-43', name: 'برتقال ليمون عصير', price: 35, category: 'مشروبات باردة' },

      // مشروبات باردة (سموزي)
      { id: '4-44', name: 'مانجو سموزي', price: 40, category: 'مشروبات باردة' },
      { id: '4-45', name: 'فراولة سموزي', price: 40, category: 'مشروبات باردة' },
      { id: '4-46', name: 'جوافة سموزي', price: 35, category: 'مشروبات باردة' },
      { id: '4-47', name: 'ليمون سموزي', price: 30, category: 'مشروبات باردة' },
      { id: '4-48', name: 'ليمون نعناع سموزي', price: 35, category: 'مشروبات باردة' },
      { id: '4-49', name: 'مكس بيري سموزي', price: 40, category: 'مشروبات باردة' },
      { id: '4-50', name: 'بنانا مكس بيري سموزي', price: 50, category: 'مشروبات باردة' },
      { id: '4-51', name: 'ليمون توت ازرق سموزي', price: 35, category: 'مشروبات باردة' },

      // صودا
      { id: '4-52', name: 'موهيتو: نعناع - بلو بيري - فراولة - بلو كروسو', price: 40, category: 'صودا' },
      { id: '4-53', name: 'موهيتو ريد بول نعناع - بلو بيري - فراولة - بلو كروسو', price: 65, category: 'صودا' },

      // أيس كريم
      { id: '4-54', name: 'بولة', price: 10, category: 'أيس كريم' },
      { id: '4-55', name: 'مكس', price: 25, category: 'أيس كريم' },
      { id: '4-56', name: 'إضافة صوص', price: 5, category: 'أيس كريم' },

      // أيس كوفي
      { id: '4-57', name: 'أيس اسبريسو', price: 35, category: 'أيس كوفي' },
      { id: '4-58', name: 'كلاسيك', price: 40, category: 'أيس كوفي' },
      { id: '4-59', name: 'موكا', price: 45, category: 'أيس كوفي' },
      { id: '4-60', name: 'كراميل', price: 45, category: 'أيس كوفي' },
      { id: '4-61', name: 'أيس كابتشينو (دبل اسبريسو)', price: 45, category: 'أيس كوفي' },

      // لاتيه فرابيه
      { id: '4-62', name: 'افوكادو (أيس كريم واسبريسو)', price: 40, category: 'لاتيه فرابيه' },
      { id: '4-63', name: 'كلاسيك', price: 45, category: 'لاتيه فرابيه' },
      { id: '4-64', name: 'موكا', price: 50, category: 'لاتيه فرابيه' },
      { id: '4-65', name: 'كراميل', price: 50, category: 'لاتيه فرابيه' },
      { id: '4-66', name: 'لوتس', price: 60, category: 'لاتيه فرابيه' },
      { id: '4-67', name: 'نوتيلا', price: 60, category: 'لاتيه فرابيه' },

      // الفطار (ساندوتشات)
      { id: '4-68', name: 'فول بالطحينة', price: 10, category: 'الفطار' },
      { id: '4-69', name: 'فول اسكندراني', price: 12, category: 'الفطار' },
      { id: '4-70', name: 'بابا غنوج', price: 12, category: 'الفطار' },
      { id: '4-71', name: 'بطاطس كاتشب ومايونيز', price: 13, category: 'الفطار' },
      { id: '4-72', name: 'لانشون', price: 20, category: 'الفطار' },
      { id: '4-73', name: 'رومي', price: 20, category: 'الفطار' },
      { id: '4-74', name: 'اومليت', price: 15, category: 'الفطار' },
      { id: '4-75', name: 'بطاطس بابا غنوج', price: 20, category: 'الفطار' },
      { id: '4-76', name: 'اومليت خضار', price: 20, category: 'الفطار' },
      { id: '4-77', name: 'اومليت (بسطرمة - سوسيس - رومي - موتزاريلا)', price: 25, category: 'الفطار' },
      { id: '4-78', name: 'لانشون رومي', price: 30, category: 'الفطار' },
      { id: '4-79', name: 'جبنة مقلية', price: 20, category: 'الفطار' },
      { id: '4-80', name: 'مربى', price: 15, category: 'الفطار' },
      { id: '4-81', name: 'حلاوة طحينية', price: 20, category: 'الفطار' },
      { id: '4-82', name: 'باكيت بطاطس صغير', price: 20, category: 'الفطار' },
      { id: '4-83', name: 'باكيت بطاطس كبير', price: 30, category: 'الفطار' },

      // برجر
      { id: '4-84', name: 'برجر كلاسيك فراخ / لحمة', price: 60, category: 'برجر' },
      { id: '4-85', name: 'برجر تشيز', price: 70, category: 'برجر' },
      { id: '4-86', name: 'برجر باربيكيو / رانش', price: 70, category: 'برجر' },
      { id: '4-87', name: 'برجر رانش كرانش', price: 75, category: 'برجر' },
      { id: '4-88', name: 'برجر تشيلي بيف', price: 75, category: 'برجر' },
      { id: '4-89', name: 'وجبة كومبو (برجر - بطاطس - ساقع)', price: 90, category: 'برجر' },
      { id: '4-90', name: 'حواوشي لحمة بلدي ساده', price: 40, category: 'برجر' },
      { id: '4-91', name: 'حواوشي لحمة بلدي بالجبنة', price: 50, category: 'برجر' },

      // سوري
      { id: '4-92', name: 'بطاطس تومية أو كاتشب مايونيز', price: 30, category: 'سوري' },
      { id: '4-93', name: 'بطاطس رومي أو موتزاريلا', price: 40, category: 'سوري' },
      { id: '4-94', name: 'بطاطس مكس جبن', price: 45, category: 'سوري' },
      { id: '4-95', name: 'بطاطس بيض', price: 60, category: 'سوري' },
      { id: '4-96', name: 'ساندوتش سجق', price: 60, category: 'سوري' },
      { id: '4-97', name: 'ساندوتش هوت دوج', price: 60, category: 'سوري' },
      { id: '4-98', name: 'ساندوتش كريسبي', price: 75, category: 'سوري' },
      { id: '4-99', name: 'ساندوتش شيش', price: 70, category: 'سوري' },
      { id: '4-100', name: 'ساندوتش فاهيتا فراخ', price: 75, category: 'سوري' },
      { id: '4-101', name: 'ساندوتش شاورما فراخ', price: 70, category: 'سوري' },
      { id: '4-102', name: 'ساندوتش كفتة', price: 70, category: 'سوري' },
      { id: '4-103', name: 'ساندوتش مكس فراخ', price: 85, category: 'سوري' },

      // البيتزا
      { id: '4-104', name: 'بيتزا مارجريتا (وسط)', price: 70, category: 'البيتزا' },
      { id: '4-105', name: 'بيتزا مارجريتا (كبير)', price: 100, category: 'البيتزا' },
      { id: '4-106', name: 'بيتزا فيجيتريان (وسط)', price: 75, category: 'البيتزا' },
      { id: '4-107', name: 'بيتزا فيجيتريان (كبير)', price: 110, category: 'البيتزا' },
      { id: '4-108', name: 'بيتزا سجق / سوسيس (وسط)', price: 90, category: 'البيتزا' },
      { id: '4-109', name: 'بيتزا سجق / سوسيس (كبير)', price: 120, category: 'البيتزا' },
      { id: '4-110', name: 'بيتزا كواترو فورماجيو (وسط)', price: 95, category: 'البيتزا' },
      { id: '4-111', name: 'بيتزا كواترو فورماجيو (كبير)', price: 130, category: 'البيتزا' },
      { id: '4-112', name: 'بيتزا شاورما فراخ (وسط)', price: 100, category: 'البيتزا' },
      { id: '4-113', name: 'بيتزا شاورما فراخ (كبير)', price: 135, category: 'البيتزا' },
      { id: '4-114', name: 'بيتزا تشيكن رانش / باربيكيو (وسط)', price: 110, category: 'البيتزا' },
      { id: '4-115', name: 'بيتزا تشيكن رانش / باربيكيو (كبير)', price: 150, category: 'البيتزا' },
      { id: '4-116', name: 'بيتزا لحم (وسط)', price: 100, category: 'البيتزا' },
      { id: '4-117', name: 'بيتزا لحم (كبير)', price: 135, category: 'البيتزا' },
      { id: '4-118', name: 'بيتزا بسطرمة (وسط)', price: 110, category: 'البيتزا' },
      { id: '4-119', name: 'بيتزا بسطرمة (كبير)', price: 140, category: 'البيتزا' },
      { id: '4-120', name: 'بيتزا تونة (وسط)', price: 110, category: 'البيتزا' },
      { id: '4-121', name: 'بيتزا تونة (كبير)', price: 140, category: 'البيتزا' },
      { id: '4-122', name: 'بيتزا بيبروني (وسط)', price: 110, category: 'البيتزا' },
      { id: '4-123', name: 'بيتزا بيبروني (كبير)', price: 140, category: 'البيتزا' },
      { id: '4-124', name: 'بيتزا سوبر سوبريم (وسط)', price: 120, category: 'البيتزا' },
      { id: '4-125', name: 'بيتزا سوبر سوبريم (كبير)', price: 150, category: 'البيتزا' },
      { id: '4-126', name: 'بيتزا مكس فراخ (وسط)', price: 125, category: 'البيتزا' },
      { id: '4-127', name: 'بيتزا مكس فراخ (كبير)', price: 160, category: 'البيتزا' },
      { id: '4-128', name: 'بيتزا هلا (وسط)', price: 125, category: 'البيتزا' },
      { id: '4-129', name: 'بيتزا هلا (كبير)', price: 160, category: 'البيتزا' },

      // الكريب
      { id: '4-130', name: 'كريب بوم فريت', price: 50, category: 'الكريب' },
      { id: '4-131', name: 'كريب هوت دوج / سجق', price: 65, category: 'الكريب' },
      { id: '4-132', name: 'كريب شاورما فراخ', price: 80, category: 'الكريب' },
      { id: '4-133', name: 'كريب فراخ كرسبي', price: 85, category: 'الكريب' },
      { id: '4-134', name: 'كريب شيش / كفتة', price: 80, category: 'الكريب' },
      { id: '4-135', name: 'كريب فاهيتا فراخ', price: 85, category: 'الكريب' },
      { id: '4-136', name: 'كريب مكس فراخ (شاورما - كرسبي - بطاطس)', price: 95, category: 'الكريب' },
      { id: '4-137', name: 'كريب هلا (سوسيس - مفروم - بيبروني - بطاطس)', price: 95, category: 'الكريب' },

      // الإضافات
      { id: '4-138', name: 'موتزاريلا', price: 10, category: 'الإضافات' },
      { id: '4-139', name: 'بطاطس', price: 10, category: 'الإضافات' },
      { id: '4-140', name: 'رانش', price: 15, category: 'الإضافات' },
      { id: '4-141', name: 'باربيكيو', price: 10, category: 'الإضافات' },
      { id: '4-142', name: 'سبايسي', price: 5, category: 'الإضافات' },
    ]
  }
];
