#Solution : 2407905288
class Sort:
    def __init__(self):
        pass

    def quick_sort(self, X, low, high, flag=1):
        if low >= high:
            return 0

        p = low if flag == 1 else (high if flag == 2 else self.median(X, low, high))
        X[low], X[p] = X[p], X[low]

        j = self.partition(X, low, high)
        c1 = high - low
        c2 = self.quick_sort(X, low, j - 1, flag)
        c3 = self.quick_sort(X, j + 1, high, flag)

        return c1 + c2 + c3

    def partition(self, X, low, high):
        p = X[low]
        i = low + 1
        j = low + 1

        for j in range(j, high + 1):
            if X[j] < p:
                X[j], X[i] = X[i], X[j]
                i += 1

        X[low], X[i - 1] = X[i - 1], X[low]
        return i - 1

    def median(self, X, low, high):
        mid = low + (high - low) // 2
        b1 = X[high] > X[mid]
        b2 = X[mid] > X[low]
        b3 = X[low] > X[high]

        if (b1 and b2) or (not b1 and not b2):
            return mid
        elif (b1 and b3) or (not b1 and not b3):
            return high
        elif (b2 and b3) or (not b2 and not b3):
            return low


if __name__ == "__main__":
    with open("02.QuickSort.txt", "r") as file:
        X = [int(line) for line in file]

    qs = Sort()
    X1, X2 = X.copy(), X.copy()
    c1 = qs.quick_sort(X1, 0, len(X) - 1, 1)
    c2 = qs.quick_sort(X2, 0, len(X) - 1, 2)
    c3 = qs.quick_sort(X, 0, len(X) - 1, 3)

    print(c1)
    print(c2)
    print(c3)

